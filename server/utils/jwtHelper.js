// This module handles everything related to JSON Web Tokens (JWTs): creating, verifying, decoding, and managing token blacklisting using Redis.

const jwt = require("jsonwebtoken");
const redisClient = require("./redisClient");
const logger = require("./logger");

const JWT_SECRET = process.env.JWT_SECRET; //Used to sign and verify tokens
const ACCESS_TOKEN_EXPIRY = "15m"; // Adjust as needed
const REFRESH_TOKEN_EXPIRY = "7d"; // Adjust as needed

//Ensures your server won't run if the secret is missing—good for security.
if (!JWT_SECRET) {
  logger.error("JWT_SECRET is not defined. Exiting...");
  process.exit(1);
}

// Function to verify the access token
const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    logger.warn(`Access token verification failed: ${error.message}`);
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
    return jwt.decode(token);
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
    return (await redisClient.get(token)) === "blacklisted";
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
};
