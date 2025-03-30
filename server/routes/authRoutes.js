const express = require("express");
const authController = require("../controllers/authController");
const checkTokenBlacklist = require("../middlewares/checkTokenBlacklist");
const {
  usernameValidation,
  emailValidation,
  passwordValidation,
  refreshTokenValidation,
  accessTokenValidation,
} = require("../middlewares/validators"); // Move validation rules to a separate file

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

module.exports = router;
