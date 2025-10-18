//This file handles all the authentication logic
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const logger = require("../utils/logger");
const jwtHelper = require("../utils/jwtHelper");
const { query } = require("../utils/pgHelper");
const { sendResetEmail } = require("../utils/emailHelper");

//import crypto for resetting password
const crypto = require("crypto");

// User Registration <-----------------------------------------------
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }

  //get data from the body
  let { username, email, password } = req.body;

  try {
    const saltRounds = process.env.NODE_ENV === "production" ? 12 : 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //add user to db
    await query(
      "INSERT INTO smartygrand_users (username, email, password) VALUES ($1, $2, $3)",
      [username, email, hashedPassword]
    );
    logger.info(`User registered: ${username}`);
    res.status(201).json({ message: "Registration Successful!" });
  } catch (error) {
    if (error.code === "23505") {
      // PostgreSQL duplicate entry error
      logger.warn(`Registration failed: Duplicate entry for ${username}`);
      return res
        .status(409)
        .json({ message: "Username or email already exists!" });
    }
    logger.error(`Registration error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};

// User Login <--------------------<---------------------------
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const result = await query(
      "SELECT id, username, password FROM smartygrand_users WHERE username = $1",
      [username]
    );

    if (result.rows.length === 0) {
      logger.warn(`Login failed: User not found (${username})`);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: Incorrect password for (${username})`);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    //get access token from jwtHelper
    const accessToken = jwtHelper.generateAccessToken({
      id: user.id,
      username: user.username,
    });

    //get refresh token from jwtHelper
    const refreshToken = jwtHelper.generateRefreshToken({
      id: user.id,
      username: user.username,
    });

    // Hash the refresh token before saving
    const hashedRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");
    // Store the refresh token in DB
    await query(
      "UPDATE smartygrand_users SET refresh_token = $1 WHERE id = $2",
      [hashedRefreshToken, user.id]
    );
    logger.info(`Login successful: ${username}`);

    //using a cookie to store refreshToken
    console.log("Setting cookie for:", username); // 👈 add this line
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      domain: "localhost",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};

//AUTO login if already have an accessToken <------------------------------------------
exports.accessTokenLogin = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const accessToken = authHeader.split(" ")[1];
    const decoded = jwtHelper.verifyAccessToken(accessToken);

    return res.json({ user: decoded });
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

//Login with EXISTING Refresh Token <------------------------<----------------------
exports.refreshToken = async (req, res) => {
  // Get refresh token from cookies
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    // Verify refresh token
    const payload = jwtHelper.verifyToken(refreshToken);
    if (!payload) {
      logger.warn("Invalid refresh token.");
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    // Hash the incoming refresh token
    const hashedIncoming = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Compare against stored hashed token
    const result = await query(
      "SELECT refresh_token FROM smartygrand_users WHERE id = $1",
      [payload.id]
    );

    if (
      !result.rows.length ||
      result.rows[0].refresh_token !== hashedIncoming
    ) {
      logger.warn("Refresh token mismatch or not found in DB.");
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    // Issue new access token
    const newAccessToken = jwtHelper.generateAccessToken({
      id: payload.id,
      username: payload.username,
    });

    // Re-set cookie expiry (to keep session alive)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    logger.info(`New access token issued for user: ${payload.username}`);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    logger.error(`Refresh token error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Logout <-----------------------------------------------
exports.logout = async (req, res) => {
  try {
    // Extract access token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access token missing or invalid." });
    }
    const accessToken = authHeader.split(" ")[1];

    // Get refresh token from cookies
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing." });
    }

    // Verify access token
    const decoded = jwtHelper.verifyAccessToken(accessToken);
    if (!decoded) {
      logger.warn("Invalid access token during logout.");
      return res.status(403).json({ message: "Invalid access token." });
    }

    // Blacklist the access token in Redis
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
    await jwtHelper.blacklistToken(accessToken, expiresIn);

    // Verify and blacklist refresh token
    const payload2 = jwtHelper.verifyToken(refreshToken);
    if (!payload2) {
      logger.warn("Invalid refresh token during logout.");
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    const refreshExpiresIn = payload2.exp - Math.floor(Date.now() / 1000);
    await jwtHelper.blacklistToken(refreshToken, refreshExpiresIn);

    // Hash the refresh token and remove from DB
    const hashedIncoming = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const result = await query(
      "UPDATE smartygrand_users SET refresh_token = NULL WHERE refresh_token = $1",
      [hashedIncoming]
    );

    if (result.rowCount === 0) {
      logger.warn("Logout failed: Refresh token not found in DB.");
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    // Clear cookie securely
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // Send success response
    logger.info(`User logged out: ${decoded.username}`);
    return res.status(200).json({ message: "Logged out successfully." });
  } catch (error) {
    logger.error(`Logout error: ${error.message}`);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//FORGOT PASSWORD login <---------------------------------------------------------------
exports.forgotPassword = async (req, res) => {
  const email = req.body?.email;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "A valid email is required." });
  }

  try {
    const cleanEmail = email.trim().toLowerCase();

    const userResult = await query(
      "SELECT id FROM smartygrand_users WHERE email = $1",
      [cleanEmail]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "Email not found." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000);

    await query(
      "UPDATE smartygrand_users SET reset_token = $1, reset_token_expires = $2 WHERE email = $3",
      [token, expires, cleanEmail]
    );

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;
    console.log("Sending reset email to", cleanEmail, "with link:", resetLink);

    await sendResetEmail(cleanEmail, resetLink); // Only this call is needed

    logger.info(`Password reset token sent to ${cleanEmail}`);
    res.json({ message: "Password reset link sent to email." });
  } catch (error) {
    logger.error(`Forgot password error: ${error.message}`);
    console.error(error.stack);
    res.status(500).json({ message: "Internal server error." });
  }
};

//RESET PASSWORD LOGIC  <----------------------------------------------------------
exports.resetPassword = async (req, res) => {
  const token = req.params?.token;
  const newPassword = req.body?.newPassword;

  if (!token || typeof token !== "string") {
    return res.status(400).json({ message: "Invalid or missing token." });
  }

  if (
    !newPassword ||
    typeof newPassword !== "string" ||
    newPassword.length < 6
  ) {
    return res
      .status(400)
      .json({ message: "New password must be at least 6 characters long." });
  }

  try {
    const result = await query(
      "SELECT id, reset_token_expires FROM smartygrand_users WHERE reset_token = $1",
      [token]
    );

    if (
      result.rows.length === 0 ||
      new Date(result.rows[0].reset_token_expires) < new Date()
    ) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await query(
      `UPDATE smartygrand_users 
       SET password = $1, reset_token = NULL, reset_token_expires = NULL 
       WHERE reset_token = $2`,
      [hashedPassword, token]
    );

    logger.info(`Password reset successful for token ${token}`);
    res.json({ message: "Password has been reset successfully." });
  } catch (error) {
    logger.error(`Reset password error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};
