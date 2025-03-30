const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const redisClient = require("../utils/redisClient");
const logger = require("../utils/logger");
const jwtHelper = require("../utils/jwtHelper");
const { executeQuery } = require("../utils/dbHelper");

// User Registration
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const saltRounds = process.env.NODE_ENV === "production" ? 12 : 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await executeQuery(
      "INSERT INTO smartydb_users (username, password, email) VALUES (?, ?, ?)",
      [username, hashedPassword, email]
    );

    logger.info(`User registered: ${username}`);
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    if (error.errno === 1062) {
      logger.warn(`Registration failed: Duplicate entry for ${username}`);
      return res
        .status(409)
        .json({ message: "Username or email already exists." });
    }
    logger.error(`Registration error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};

// User Login
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const users = await executeQuery(
      "SELECT id, username, password FROM smartydb_users WHERE username = ?",
      [username]
    );

    if (users.length === 0) {
      logger.warn(`Login failed: User not found (${username})`);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: Incorrect password (${username})`);
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const accessToken = jwtHelper.generateAccessToken({
      id: user.id,
      username: user.username,
    });
    const refreshToken = jwtHelper.generateRefreshToken({
      id: user.id,
      username: user.username,
    });

    logger.info(`Login successful: ${username}`);
    res.json({ accessToken, refreshToken });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(`Validation failed: ${JSON.stringify(errors.array())}`);
    return res.status(400).json({ errors: errors.array() });
  }

  const { refreshToken } = req.body;

  try {
    const payload = jwtHelper.verifyRefreshToken(refreshToken);
    if (!payload) {
      logger.warn(`Invalid refresh token.`);
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    const newAccessToken = jwtHelper.generateAccessToken({
      id: payload.id,
      username: payload.username,
    });

    logger.info(`New access token issued for user: ${payload.username}`);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    logger.error(`Refresh token error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Logout
exports.logout = async (req, res) => {
  const { accessToken, refreshToken } = req.body;

  try {
    const decoded = jwtHelper.verifyAccessToken(accessToken);
    if (!decoded) {
      logger.warn(`Invalid access token.`);
      return res.status(403).json({ message: "Invalid access token." });
    }

    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
    await redisClient.set(accessToken, "blacklisted", { EX: expiresIn });

    const result = await executeQuery(
      "UPDATE smartydb_users SET refresh_token = NULL WHERE refresh_token = ?",
      [refreshToken]
    );

    if (result.affectedRows === 0) {
      logger.warn(`Logout failed: Refresh token not found.`);
      return res.status(403).json({ message: "Invalid refresh token." });
    }

    logger.info(`User logged out: ${decoded.username}`);
    res.json({ message: "Logged out successfully." });
  } catch (error) {
    logger.error(`Logout error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};
