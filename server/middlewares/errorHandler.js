// Centralized error-handling middleware (optional)

const logger = require("../utils/logger");

// Global error-handling middleware
const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message} | Stack: ${err.stack}`);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
