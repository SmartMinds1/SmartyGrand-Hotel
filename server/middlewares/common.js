const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const commonMiddleware = (app) => {
  // Security headers
  app.use(helmet());

  // Rate limiter
  const rateLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // Default: 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100, // Default: 100 requests per window
    message: {
      status: 429,
      error: "Too many requests",
      message:
        "You have exceeded the maximum allowed requests. Please try again later.",
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
  });
  app.use(rateLimiter);

  // Enable CORS
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:3000", "https://myproductionurl.com"];

  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(
          new Error(`CORS policy: The origin "${origin}" is not allowed.`)
        );
      }
    },
    credentials: true,
  };
  app.use(cors(corsOptions));
};

module.exports = commonMiddleware;
