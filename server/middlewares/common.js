//This file defines a function (commonMiddleware) that registers essential middlewares for: Security, CORS and JSON request parsing
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const logger = require("../utils/logger");

const commonMiddleware = (app) => {
  // Securing our app by setting HTTP headers
  app.use(helmet());

  // Controling which domains are allowed to access our backend
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
  app.use(express.json({ limit: "10kb" })); // Limit large file to prevent DOS attacks
};

module.exports = commonMiddleware;
