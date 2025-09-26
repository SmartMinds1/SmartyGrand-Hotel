//This file defines a function (commonMiddleware) that registers essential middlewares for: Security, Rate limiting, CORS and JSON request parsing

const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const logger = require("../utils/logger");

const commonMiddleware = (app) => {
  // Security headers
  app.use(helmet());

  // Rate limiter
  const isDev = process.env.NODE_ENV !== "production";

  const rateLimiter = rateLimit({
    windowMs: isDev ? 60 * 1000 : 15 * 60 * 1000, // 1 min in dev, 15 mins in prod
    max: isDev ? 1000 : 100, // high limit in dev, strict in prod
    handler: (req, res) => {
      logger.warn(` Rate limit exceeded for IP: ${req.ip}`);
      res.status(429).json({
        status: 429,
        error: "Too many requests",
        message:
          "You have exceeded the maximum allowed requests. Please try again later.",
      });
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  if (!isDev) {
    app.use(rateLimiter);
  }

  // Enable CORS with dynamic origin handling
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["https://smartygrandhotel.com"];

  const corsOptions = {
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        (isDev && /^http:\/\/localhost:\d+$/.test(origin))
      ) {
        callback(null, true);
      } else {
        logger.warn(`Blocked CORS request from origin: ${origin}`);
        callback(new Error("Blocked by CORS policy"), false);
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(express.json()); // Ensure JSON parsing is enabled
};

module.exports = commonMiddleware;
