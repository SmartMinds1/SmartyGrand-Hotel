const express = require("express");
const authController = require("../controllers/authController");
const { registerLimiter, loginLimiter } = require("../middlewares/limiter");
const checkTokenBlacklist = require("../middlewares/checkTokenBlacklist");
const {
  usernameValidation,
  emailValidation,
  passwordValidation,
  refreshTokenValidation,
  accessTokenValidation,
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
  [checkTokenBlacklist, refreshTokenValidation],
  authController.refreshToken
);

// Logout
router.post(
  "/logout",
  [checkTokenBlacklist, accessTokenValidation, refreshTokenValidation],
  authController.logout
);

//forgot password
router.post("/forgot-password", authController.forgotPassword);

//reset password
router.post("/reset-password/:token", authController.resetPassword);

module.exports = router;
