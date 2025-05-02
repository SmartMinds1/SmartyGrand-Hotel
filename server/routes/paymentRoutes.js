const express = require("express");
const pool = require("../utils/pgHelper");
const router = express.Router();

//RETRIEVING PAYMENTS FROM THE DATABASE BOOKINGS
router.get(
  "/",

  async (req, res) => {
    try {
      const result = await pool.query(
        "SELECT id, username, phone, payment_code, created_at FROM smartygrand_bookings ORDER BY id DESC"
      );
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error fetching bookings", err);
      res
        .status(500)
        .json({ error: "Error retrieving bookings. Try again later" });
    }
  }
);

module.exports = router;
