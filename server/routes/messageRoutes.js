const express = require("express");
const pool = require("../utils/pgHelper");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");

//lets limit users/bots from overloading us with many messages
const messageLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: "TOO MANY requests. Please try again later.",
});

// Add a new message
router.post(
  "/",

  messageLimiter,

  //validation section
  [
    //triming to remove whitespace
    body("username")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Username is required"),
    body("email")
      .isEmail()
      .trim()
      .escape()
      .withMessage("Email should be valid"),
    body("message")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Message should not be empty"),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //retrieving values from the req body
    const { username, email, message } = req.body;

    // Additional cleaning: trim and remove spammy long spaces
    // Cleaned versions
    const cleanedUsername = username.trim().replace(/[ \t]{3,}/g, "  ");
    const cleanedEmail = email.trim().replace(/[ \t]{3,}/g, "  ");
    const cleanedMessage = message.trim().replace(/[ \t]{3,}/g, "  ");

    try {
      // Insert into the database
      const result = await pool.query(
        "INSERT INTO smartygrand_messages (username, email, message) VALUES ($1, $2, $3) RETURNING *",
        [cleanedUsername, cleanedEmail, cleanedMessage]
      );

      res.status(201).json({
        message:
          "Message submitted SUCCESSFULLY! Kindly wait for our feedback.",
        data: result.rows[0],
      });
    } catch (err) {
      console.error("Error inserting message:", err);
      res
        .status(500)
        .json({ error: "Internal Server Error. Kindly try again later!" });
    }
  }
);

/* ...........................Now Let's get messages from the database............................... */
// GET all messages
router.get(
  "/",

  async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, username, email, message, created_at FROM smartygrand_messages ORDER BY id DESC"
      );
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error fetching messages:", err);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  }
);

// DELETE a booking by ID
router.delete(
  "/:id",

  async (req, res) => {
    const messageId = req.params.id;
    try {
      const result = await pool.query(
        "DELETE FROM smartygrand_messages WHERE id = $1 RETURNING *",
        [messageId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Message not found" });
      }
      res.status(200).json({ message: "Message deleted successfully" });
    } catch (err) {
      console.error("Error deleting Message", err);
      res
        .status(500)
        .json({ error: "Error deleting Message. Try again later." });
    }
  }
);

module.exports = router;
