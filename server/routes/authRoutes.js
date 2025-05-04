const express = require("express");
const authController = require("../controllers/authController");
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
  [usernameValidation, emailValidation, passwordValidation],
  authController.register
);

// User Login
router.post(
  "/login",
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
