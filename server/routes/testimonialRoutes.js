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
        message: "Comment sent successfully!",
        data: results.rows[0],
      });

      //catching error
    } catch (err) {
      console.error("Error inserting testimonial to db", err);
      res.status(500).json({ error: "internal server error" });
    }
  }
);

/* ...........................Now Let's get testimonials from the database............................... */
// GET all comments
router.get(
  "/",

  async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, username, comment, received_at FROM smartygrand_testimonials ORDER BY id DESC"
      );
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error fetching commentss:", err);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  }
);

// DELETE a comment by ID
router.delete(
  "/:id",

  async (req, res) => {
    const commentId = req.params.id;
    try {
      const result = await pool.query(
        "DELETE FROM smartygrand_testimonials WHERE id = $1 RETURNING *",
        [commentId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
      console.error("Error deleting Comment", err);
      res
        .status(500)
        .json({ error: "Error deleting Comment. Try again later." });
    }
  }
);

module.exports = router;
