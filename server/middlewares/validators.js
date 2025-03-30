const { body } = require("express-validator");

exports.usernameValidation = body("username")
  .notEmpty()
  .withMessage("Username is required.")
  .isLength({ min: 3 })
  .withMessage("Username must be at least 3 characters long.");

exports.emailValidation = body("email")
  .notEmpty()
  .withMessage("Email is required.")
  .isEmail()
  .withMessage("Invalid email address.");

exports.passwordValidation = body("password")
  .notEmpty()
  .withMessage("Password is required.")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long.");

exports.refreshTokenValidation = body("refreshToken")
  .notEmpty()
  .withMessage("Refresh token is required.")
  .isString()
  .withMessage("Refresh token must be a string.");

exports.accessTokenValidation = body("accessToken")
  .notEmpty()
  .withMessage("Access token is required.")
  .isString()
  .withMessage("Access token must be a string.");
