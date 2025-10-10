//This file handles all the required business logic for all the booking routes
const bkngModel = require("../models/bkngModel");

class bkngService {
  //creating a new booking
  static async createBooking(
    username,
    email,
    phone,
    payment_code,
    checkin,
    checkout,
    guests,
    room
  ) {
    const result = await bkngModel.createBooking(
      username,
      email,
      phone,
      payment_code,
      checkin,
      checkout,
      guests,
      room
    );
    return result.rows[0]; // return data only
  }

  //Getting all bookings
  static async getAllBookings() {
    const result = await bkngModel.getAllBookings();
    return result.rows;
  }

  //Deleting a booking
  static async deleteBooking(bookingId) {
    const result = await bkngModel.deleteBooking(bookingId);
    return result;
  }
}

module.exports = bkngService;
