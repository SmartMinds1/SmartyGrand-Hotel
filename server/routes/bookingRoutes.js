//Before sending anything to the controller, the route verifies everything and determines who in the controller should execute that reques
const express = require("express");
const router = express.Router();
const bkngController = require("../controllers/bkngController");
const {
  usernameValidation,
  emailValidation,
  phoneValidation,
  payment_codeValidation,
  checkinValidation,
  checkoutValidation,
  questValidation,
  roomValidation,
} = require("../middlewares/validators");

//ADDING BOOKINGS
router.post(
  "/",
  [
    usernameValidation,
    emailValidation,
    phoneValidation,
    payment_codeValidation,
    checkinValidation,
    checkoutValidation,
    questValidation,
    roomValidation,
  ],
  bkngController.createBooking
);

//RETRIEVING BOOKINGS FROM THE DATABASE
router.get("/", bkngController.getAllBookings);

// DELETE a booking by ID
router.delete("/:id", bkngController.deleteBooking);

module.exports = router;
