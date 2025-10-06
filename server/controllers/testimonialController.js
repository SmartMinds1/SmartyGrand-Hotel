//This file sends requests and receives back response needed by the routes
const logger = require("../utils/logger");
const { validationResult } = require("express-validator");
const testimonialService = require("../services/testimonialService");

//------------Add new comment-----------------
exports.sendComment = async (req, res) => {
  //cheking for any available errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //retrieve values from the req body
  const { username, comment } = req.body;

  try {
    //adding data to database
    const data = await testimonialService.sendComment(username, comment);

    //success message
    logger.info(`Comment sent by: ${username}`);
    res.status(201).json({
      message: "Comment sent successfully!",
      data,
    });

    //catching error
  } catch (err) {
    logger.error(`Error inserting message: ${err.message}`);
    res.status(500).json({ error: "internal server error, try again later" });
  }
};

//------------Getting all comments-----------------
exports.getAllComments = async (req, res) => {
  try {
    const result = await testimonialService.getAllComments();
    res.status(200).json(result.rows);
  } catch (err) {
    logger.error(`Error fetching comments: ${err.message}`);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

//------------Deleting a comment-----------------
exports.deleteComment = async (req, res) => {
  try {
    const result = await testimonialService.deleteComment(req.params.id);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    logger.error(`Error deleting Comment ${err.message}`);
    res.status(500).json({ error: "Error deleting Comment. Try again later." });
  }
};
