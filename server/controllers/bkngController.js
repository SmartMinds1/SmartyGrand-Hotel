const logger = require("../utils/logger");
const { validationResult } = require("express-validator");
const bkngService = require("../services/bkngService");

//ADDING a booking
exports.createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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

  try {
    const data = await bkngService.createBooking(
      username,
      email,
      phone,
      payment_code,
      checkin,
      checkout,
      guests,
      room
    );

    logger.info(`${username} reserved ${room} successfully`);
    res.status(201).json({
      message: `successful! Will get to you soon! ${username}`,
      data,
    });
  } catch (error) {
    logger.error(`Error reserving room: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Retrieving all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const data = await bkngService.getAllBookings();
    res.status(200).json(data);
  } catch (err) {
    logger.error(`Error fetching booking  ${err.message}`);
    res
      .status(500)
      .json({ error: "Error retrieving bookings. Try again later" });
  }
};

// DELETE a booking by ID
exports.deleteBooking = async (req, res) => {
  try {
    const result = await bkngService.deleteBooking(req.params.id);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }
    logger.info("booking deleted successfully");
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    logger.error(`Error deleting booking: ${err.message}`);
    res.status(500).json({ error: "Error deleting booking. Try again later." });
  }
};
