//Our different imports
const express = require("express");
const pool = require("../utils/pgHelper");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username must not be empty"),

    body("comment").trim().notEmpty().withMessage("Comment must not be null"),
  ],

  async (req, res) => {
    //cheking for any available errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //retrieve values from the req body
      const { username, comment } = req.body;

      //adding data to database
      const results = await pool.query(
        "INSERT INTO smartygrand_testimonials (username, comment) VALUES ($1, $2) RETURNING * ",
        [username, comment]
      );

      //success message
      res.status(201).json({
        message: "Testimonial added successfully!",
        data: results.rows[0],
      });

      //catching error
    } catch (err) {
      console.error("Error inserting testimonial to db", err);
      res.status(500).json({ error: "internal server error" });
    }
  }
);

module.exports = router;
