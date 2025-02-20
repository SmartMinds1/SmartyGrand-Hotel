const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const checkTokenBlacklist = require("../middlewares/checkTokenBlacklist");
const jwtHelper = require("../utils/jwtHelper"); // Import jwtHelper

const router = express.Router();

// Validation rules
const usernameValidation = body("username")
  .notEmpty()
  .withMessage("Username is required.")
  .isLength({ min: 3 })
  .withMessage("Username must be at least 3 characters long.");

const emailValidation = body("email")
  .notEmpty()
  .withMessage("Email is required.")
  .isEmail()
  .withMessage("Invalid email address.");

const passwordValidation = body("password")
  .notEmpty()
  .withMessage("Password is required.")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long.");

const refreshTokenValidation = body("refreshToken")
  .notEmpty()
  .withMessage("Refresh token is required.")
  .isString()
  .withMessage("Refresh token must be a string.");

const accessTokenValidation = body("accessToken")
  .notEmpty()
  .withMessage("Access token is required.")
  .isString()
  .withMessage("Access token must be a string.");

// Routes
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
  async (req, res) => {
    try {
      const { refreshToken } = req.body;
      // Use jwtHelper to verify the refresh token
      const payload = jwtHelper.verifyRefreshToken(refreshToken);
      if (!payload) {
        return res.status(403).json({ message: "Invalid refresh token." });
      }
      const newAccessToken = jwtHelper.generateAccessToken({
        id: payload.id,
        username: payload.username,
      });
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(500).json({ message: "Server error." });
    }
  }
);

// Logout
router.post(
  "/logout",
  [checkTokenBlacklist, accessTokenValidation, refreshTokenValidation],
  authController.logout
);

module.exports = router;
