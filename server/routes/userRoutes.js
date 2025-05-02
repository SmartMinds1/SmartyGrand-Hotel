const express = require("express");
const pool = require("../utils/pgHelper");
const router = express.Router();

/* -------------The next route is for fetching users from the database------------------------- */
// GET all users
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email FROM smartygrand_users ORDER BY id DESC"
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// DELETE a user by ID
router.delete(
  "/:id",

  async (req, res) => {
    const userId = req.params.id;
    try {
      const result = await pool.query(
        "DELETE FROM smartygrand_users WHERE id = $1 RETURNING *",
        [userId]
      );

      if (result.rowCount === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      console.error("Error deleting User", err);
      res.status(500).json({ error: "Error deleting User. Try again later." });
    }
  }
);

module.exports = router;
