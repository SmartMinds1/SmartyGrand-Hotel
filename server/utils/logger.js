// Handles logging using Winston

const { createLogger, format, transports } = require("winston");

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info", // Default log level
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // Capture error stack traces
    format.colorize(), // Adds color coding to console logs
    format.printf(({ timestamp, level, message, stack }) => {
      return stack
        ? `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`
        : `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console({
      handleExceptions: true, // Handle uncaught exceptions
    }),
  ],
  exitOnError: false, // Prevent process exit on error
});

// Graceful shutdown
process.on("SIGINT", () => {
  logger.info("Logger shutting down.");
  process.exit(0);
});

module.exports = logger;
