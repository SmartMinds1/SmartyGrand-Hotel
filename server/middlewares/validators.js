//This file is typically used to validate user input before it reaches your main route logic.

const { body } = require("express-validator");

exports.usernameValidation = body("username")
  .notEmpty()
  .withMessage("Username is required.")
  .trim()
  .replace(/[ \t]{3,}/g, "  ")
  .escape()
  .toLowerCase()
  .isLength({ min: 3, max: 20 })
  .withMessage("Username must be at least 3 - 20 characters long.");

exports.emailValidation = body("email")
  .notEmpty()
  .withMessage("Email is required.")
  .isEmail()
  .withMessage("Invalid email address.")
  .trim()
  .replace(/[ \t]{3,}/g, "  ")
  .toLowerCase()
  .escape();

exports.passwordValidation = body("password")
  .notEmpty()
  .withMessage("Password is required.")
  .isLength({ min: 8 })
  .withMessage("Password must be at least 8 characters long.")
  .trim()
  .replace(/[ \t]{3,}/g, "  ");

exports.messageValidation = body("message")
  .notEmpty()
  .trim()
  .replace(/[ \t]{3,}/g, "  ")
  .escape()
  .withMessage("Message should not be empty");

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
