const express = require("express");
const pool = require("../utils/pgHelper");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("username")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("username must not be empty"),
    body("email").isEmail().trim().escape().withMessage("Email must be valid"),
    body("phone")
      .isNumeric()
      .trim()
      .escape()
      .withMessage("Phone must not be empty"),
    body("payment_code")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("payment_code must not be empty"),
    body("checkin")
      .notEmpty()
      .isISO8601()
      .withMessage("Checkin must be a valid date"),
    body("checkout")
      .notEmpty()
      .isISO8601()
      .withMessage("Checkout must be a valid date"),
    body("guests")
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("Guests must be a number greater than 0"),
    body("room")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Room must not be empty"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        username,
        email,
        phone,
        payment_code,
        checkin,
        checkout,
        guests,
        room,
      } = req.body;

      const result = await pool.query(
        `INSERT INTO smartygrand_bookings 
         (username, email, phone, payment_code, checkin, checkout, guests, room) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [username, email, phone, payment_code, checkin, checkout, guests, room]
      );

      res.status(201).json({
        message: "Room booked successfully! Wait for our feedback",
        data: result.rows[0],
      });
    } catch (error) {
      console.error("Error reserving room:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
