const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const pool = require("./db");
const logger = require("./utils/logger");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const redisClient = require("./utils/redisClient");
const { body, validationResult } = require("express-validator");
const checkTokenBlacklist = require("./middlewares/checkTokenBlacklist");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware
app.use(
  helmet.hsts({
    maxAge: 31536000, // One year in seconds
    includeSubDomains: true, // Apply to all subdomains
    preload: true, // Allow the domain to be preloaded by browsers
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"], // Adjust to your frontend URL
    credentials: true,
  })
);
app.use(express.json());

//Redirect HTTP to HTTPS
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

//rate limiter configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again later.",
});

// -----------------------------User Registration---------------------------------------
app.post(
  "/register",
  [
    // Validation rules
    body("username")
      .notEmpty()
      .withMessage("Username is required.")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long."),
    body("email")
      .notEmpty()
      .withMessage("Email is required.")
      .isEmail()
      .withMessage("Invalid email address."),
    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(
        `Validation failed for registration: ${JSON.stringify(errors.array())}`
      );
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      const saltRounds = process.env.NODE_ENV === "production" ? 12 : 8;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const conn = await pool.getConnection();
      await conn.query(
        "INSERT INTO smartydb_users (username, password, email) VALUES (?, ?, ?)",
        [username, hashedPassword, email]
      );
      conn.release();

      logger.info(`User registered successfully: ${username}`);
      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      if (error.errno === 1062) {
        logger.warn(
          `Registration failed: Username or email already exists (${username})`
        );
        res.status(409).json({ message: "Username or email already exists." });
      } else {
        logger.error(`Registration error: ${error.message}`);
        res.status(500).json({ message: "Server error." });
      }
    }
  }
);

//-----------------------------------------User Login--------------------------------
app.post(
  "/login",
  [
    // Validation rules
    body("username")
      .notEmpty()
      .withMessage("Username is required.")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long."),
    body("password")
      .notEmpty()
      .withMessage("Password is required.")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long."),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(
        `Validation failed for login: ${JSON.stringify(errors.array())}`
      );
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Log the incoming login attempt
    logger.info(`Login attempt for username: ${username}`);

    try {
      const conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT * FROM smartydb_users WHERE username = ?",
        [username]
      );
      conn.release();

      if (rows.length === 0) {
        logger.warn(`Login failed: User not found (${username})`);
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const user = rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        logger.warn(`Login failed: Incorrect password (${username})`);
        return res.status(401).json({ message: "Invalid credentials." });
      }

      const accessToken = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      logger.info(`Login successful for username: ${username}`);
      res.json({ accessToken, refreshToken });
    } catch (error) {
      logger.error(`Login error for username: ${username} - ${error.message}`);
      res.status(500).json({ message: "Server error." });
    }
  }
);

//-----------------------------------refresh-token-----------------------------------------
app.post(
  "/refresh-token",
  [
    checkTokenBlacklist,

    // Validate refreshToken
    body("refreshToken")
      .notEmpty()
      .withMessage("Refresh token is required.")
      .isString()
      .withMessage("Refresh token must be a string."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(
        `Validation failed for refresh token: ${JSON.stringify(errors.array())}`
      );
      return res.status(400).json({ errors: errors.array() });
    }

    const { refreshToken } = req.body;

    try {
      const conn = await pool.getConnection();
      const rows = await conn.query(
        "SELECT * FROM smartydb_users WHERE refresh_token = ?",
        [refreshToken]
      );
      conn.release();

      if (rows.length === 0) {
        logger.warn(`Invalid refresh token: ${refreshToken}`);
        return res.status(403).json({ message: "Invalid refresh token." });
      }

      const user = rows[0];

      // Verify the refresh token
      jwt.verify(refreshToken, JWT_SECRET, (err, decoded) => {
        if (err) {
          logger.warn(`Refresh token verification failed: ${err.message}`);
          return res.status(403).json({ message: "Invalid refresh token." });
        }

        const newAccessToken = jwt.sign(
          { id: user.id, username: user.username },
          JWT_SECRET,
          { expiresIn: "15m" } // Short-lived access token
        );

        logger.info(`New access token generated for user: ${user.username}`);
        res.json({ accessToken: newAccessToken });
      });
    } catch (error) {
      logger.error(`Error in /refresh-token: ${error.message}`);
      res.status(500).json({ message: "Server error." });
    }
  }
);

//--------------------------------------------logout---------------------------------------
app.post(
  "/logout",
  [
    checkTokenBlacklist,

    // Validate accessToken and refreshToken
    body("accessToken")
      .notEmpty()
      .withMessage("Access token is required.")
      .isString()
      .withMessage("Access token must be a string."),
    body("refreshToken")
      .notEmpty()
      .withMessage("Refresh token is required.")
      .isString()
      .withMessage("Refresh token must be a string."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn(
        `Validation failed for logout: ${JSON.stringify(errors.array())}`
      );
      return res.status(400).json({ errors: errors.array() });
    }

    const { accessToken, refreshToken } = req.body;

    try {
      // Verify the access token
      const decoded = jwt.verify(accessToken, JWT_SECRET);
      const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

      // Blacklist the access token in Redis
      await redisClient.set(accessToken, "blacklisted", { EX: expiresIn });
      logger.info(`Access token blacklisted for user: ${decoded.username}`);

      // Clear the refresh token in the database
      const conn = await pool.getConnection();
      const result = await conn.query(
        "UPDATE smartydb_users SET refresh_token = NULL WHERE refresh_token = ?",
        [refreshToken]
      );
      conn.release();

      if (result.affectedRows === 0) {
        logger.warn(`Logout failed: Refresh token not found - ${refreshToken}`);
        return res.status(403).json({ message: "Invalid refresh token." });
      }

      logger.info(`User logged out successfully: ${decoded.username}`);
      res.json({ message: "Logged out successfully." });
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        logger.warn(`Invalid access token during logout: ${error.message}`);
        return res.status(400).json({ message: "Invalid access token." });
      }

      logger.error(`Error in /logout: ${error.message}`);
      res.status(500).json({ message: "Server error." });
    }
  }
);

// --------------------------Start Server----------------------------------
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
