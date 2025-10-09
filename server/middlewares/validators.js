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

exports.commentValidation = body("comment")
  .trim()
  .notEmpty()
  .withMessage("Comment must not be null");

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

exports.phoneValidation = body("phone")
  .isNumeric()
  .trim()
  .escape()
  .withMessage("Phone must not be empty")
  .isLength({ max: 15 })
  .withMessage("Enter a valid phone length");

exports.payment_codeValidation = body("payment_code")
  .notEmpty()
  .trim()
  .escape()
  .withMessage("payment_code must not be empty")
  .isLength({ max: 10 })
  .withMessage("Enter a valid Code length");

exports.checkinValidation = body("checkin")
  .notEmpty()
  .isISO8601()
  .withMessage("Checkin must be a valid date");

exports.checkoutValidation = body("checkout")
  .notEmpty()
  .isISO8601()
  .withMessage("Checkout must be a valid date");

exports.questValidation = body("guests")
  .notEmpty()
  .isInt({ min: 1 })
  .withMessage("Guests must be a number greater than 0");

exports.roomValidation = body("room")
  .notEmpty()
  .trim()
  .escape()
  .withMessage("Room must not be empty");
