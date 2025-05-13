// Main entry point for the app
require("dotenv").config();
const express = require("express");

//routes
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes"); //  Added Messages API
const userRoutes = require("./routes/userRoutes"); //  importing userRoute ... step 1
const bookingRoutes = require("./routes/bookingRoutes"); //adding booking API
const testimonialRoutes = require("./routes/testimonialRoutes"); // adding testimonial api
const paymentRoutes = require("./routes/paymentRoutes"); // adding payments api
const mpesaRoutes = require("./routes/mpesaRoutes"); //adding MPESA api

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

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); // Added Messages API
app.use("/api/users", userRoutes); //Registering the user Route ... step 2
app.use("/api/bookings", bookingRoutes); //registering bookings routes
app.use("/api/testimonials", testimonialRoutes); //registering testimonial routes
app.use("/api/payments", paymentRoutes); // registering payment routes
app.use("/api/mpesa", mpesaRoutes); //registering the MPESA route

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).send("API is running.");
});

// Global Error Handler
app.use(errorHandler);

// Start the Server
app.listen(PORT, () => {
  logger.info(`🚀 Server is running on http://localhost:${PORT}`);
});
