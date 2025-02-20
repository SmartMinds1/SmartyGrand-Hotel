//Helper functions for signing/verifying JWTss

const jwt = require("jsonwebtoken");
const redisClient = require("./redisClient");
const logger = require("./logger");

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRY = "15m"; // Adjust as needed
const REFRESH_TOKEN_EXPIRY = "7d"; // Adjust as needed

// Function to verify the access token
const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token or not authorized.");
  }
};

// Generate Access Token
const generateAccessToken = (payload) => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });
    logger.info(`Access token generated for user: ${payload.username}`);
    return token;
  } catch (error) {
    logger.error(`Error generating access token: ${error.message}`);
    throw error;
  }
};

// Generate Refresh Token
const generateRefreshToken = (payload) => {
  try {
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });
    logger.info(`Refresh token generated for user: ${payload.username}`);
    return token;
  } catch (error) {
    logger.error(`Error generating refresh token: ${error.message}`);
    throw error;
  }
};

// Verify Token
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    logger.info(`Token successfully verified for user: ${decoded.username}`);
    return decoded;
  } catch (error) {
    logger.warn(`Token verification failed: ${error.message}`);
    throw error;
  }
};

// Decode Token (without verification)
const decodeToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    logger.info(`Token decoded: ${JSON.stringify(decoded)}`);
    return decoded;
  } catch (error) {
    logger.error(`Error decoding token: ${error.message}`);
    throw error;
  }
};

// Blacklist Token
const blacklistToken = async (token, expiryTime) => {
  try {
    await redisClient.set(token, "blacklisted", { EX: expiryTime });
    logger.info(`Token blacklisted successfully.`);
  } catch (error) {
    logger.error(`Error blacklisting token: ${error.message}`);
    throw error;
  }
};

// Check if Token is Blacklisted
const isTokenBlacklisted = async (token) => {
  try {
    const result = await redisClient.get(token);
    if (result === "blacklisted") {
      logger.warn(`Token is blacklisted.`);
      return true;
    }
    return false;
  } catch (error) {
    logger.error(`Error checking token blacklist: ${error.message}`);
    throw error;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
  decodeToken,
  blacklistToken,
  isTokenBlacklisted,
  verifyAccessToken,
  isTokenBlacklisted,
};
