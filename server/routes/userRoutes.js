const express = require("express");
const pool = require("../utils/pgHelper");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Register a new user
router.post(
  "/register",
  [
    body("username")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Username is required."),
    body("email")
      .isEmail()
      .trim()
      .escape()
      .withMessage("Invalid email address."),
    body("phone")
      .isNumeric()
      .trim()
      .escape()
      .withMessage("Phone number must be numeric."),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { username, email, phone } = req.body;

      // Check if email already exists
      const existingUser = await pool.query(
        "SELECT * FROM smartygrand_users WHERE email = $1",
        [email]
      );
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: "Email is already registered." });
      } else {
        // Register the user if they don't exist
        const result = await pool.query(
          "INSERT INTO smartygrand_users (username, email, phone) VALUES ($1, $2, $3) RETURNING *",
          [username, email, phone]
        );

        res.status(201).json({
          message: "User registered successfully.",
          data: result.rows[0],
        });
      }
    } catch (err) {
      console.error("❌ Error inserting user to DB", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

/* -------------The next route is for fetching users from the database------------------------- */
// GET all users
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT user_id, username, email, phone FROM smartygrand_users ORDER BY user_id DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
