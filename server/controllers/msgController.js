//This file handles all ther messages LOGIC
const { query } = require("../utils/pgHelper");
const logger = require("../utils/logger");
const { validationResult } = require("express-validator");

// Add a new message
exports.sendMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Get data from body
  const { username, email, message } = req.body;

  try {
    // Insert into the database
    const result = await query(
      "INSERT INTO smartygrand_messages (username, email, message) VALUES ($1, $2, $3) RETURNING *",
      [username, email, message]
    );
    logger.info(`Message sent by: ${username}`);
    res.status(201).json({
      message: "Message sent SUCCESSFULLY! Kindly wait for our feedback.",
      data: result.rows[0],
    });
  } catch (err) {
    logger.error(`Error inserting message: ${err.message}`);
    res
      .status(500)
      .json({ error: "Internal Server Error. Kindly try again later!" });
  }
};

// GET all messages
exports.getAllMessages = async (req, res) => {
  try {
    const result = await query(
      "SELECT id, username, email, message, created_at FROM smartygrand_messages ORDER BY id DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    logger.error(`Error fetching messages: ${err.message}`);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// DELETE a message by ID
exports.deleteMessage = async (req, res) => {
  const messageId = req.params.id;
  try {
    const result = await query(
      "DELETE FROM smartygrand_messages WHERE id = $1 RETURNING *",
      [messageId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Message not found" });
    }
    logger.info("Message deleted successfully");
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    logger.error(`Error deleting message: ${err.message}`);
    res.status(500).json({ error: "Error deleting Message. Try again later." });
  }
};
