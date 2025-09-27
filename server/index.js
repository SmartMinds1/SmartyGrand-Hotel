// Main entry point for the app
require("dotenv").config();
const express = require("express");
const logger = require("./utils/logger");
const errorHandler = require("./middlewares/errorHandler");
const commonMiddleware = require("./middlewares/common");

const app = express();
const PORT = process.env.PORT || 5000;

// Trust the first proxy (e.g., Ngrok)
app.set("trust proxy", 1);

// Apply common middleware
commonMiddleware(app);

// Redirect HTTP to HTTPS in production (but not for localhost)
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (
      req.headers["x-forwarded-proto"] !== "https" &&
      req.hostname !== "localhost"
    ) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Parse incoming JSON but limit it to a small file to avoid server crash.
app.use(express.json({ limit: "10kb" }));

//importing & Registering my routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/testimonials", require("./routes/testimonialRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/mpesa", require("./routes/mpesaRoutes"));

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).send("API is running.");
});

// Global Error Handler
app.use(errorHandler);

// Start the Server
app.listen(PORT, () => {
  logger.info(` Server is running on http://localhost:${PORT}`);
});
