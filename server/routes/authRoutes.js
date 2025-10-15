const express = require("express");
const authController = require("../controllers/authController");
const { registerLimiter, loginLimiter } = require("../middlewares/limiter");
const checkAccessBlacklist = require("../middlewares/checkAccessBlacklist");
const checkRefreshBlacklist = require("../middlewares/chekRefreshBlacklist");
const {
  usernameValidation,
  emailValidation,
  passwordValidation,
} = require("../middlewares/validators");

const router = express.Router();

// User Registration
router.post(
  "/register",
  registerLimiter,
  [usernameValidation, emailValidation, passwordValidation],
  authController.register
);

// User Login
router.post(
  "/login",
  loginLimiter,
  [usernameValidation, passwordValidation],
  authController.login
);

// Refresh Token
router.post(
  "/refresh-token",
  [checkRefreshBlacklist],
  authController.refreshToken
);

// Logout
router.post("/logout", [checkAccessBlacklist], authController.logout);

//forgot password
router.post("/forgot-password", authController.forgotPassword);

//reset password
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
