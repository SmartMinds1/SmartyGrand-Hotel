//Main entry point for the app

require("dotenv").config();
const express = require("express");
const authRoutes = require("./routes/authRoutes");
const logger = require("./utils/logger");
const errorHandler = require("./middlewares/errorHandler");
const commonMiddleware = require("./middlewares/common");

const app = express();
const PORT = process.env.PORT || 5000;

// Apply common middleware
commonMiddleware(app);

// Redirect HTTP to HTTPS in production
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Parse incoming JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).send("API is running.");
});

// Global Error Handler
app.use(errorHandler);

// Start the Server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
