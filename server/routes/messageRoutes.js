const express = require("express");
const pool = require("../utils/pgHelper");
const router = express.Router();

// Add a new message
router.post("/messages", async (req, res) => {
  try {
    const { username, email, message } = req.body;
    const result = await pool.query(
      "INSERT INTO messages (username, email, message) VALUES ($1, $2, $3) RETURNING *",
      [username, email, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error inserting message:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all messages
router.get("/messages", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
