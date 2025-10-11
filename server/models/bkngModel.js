//This is the file that queries all the booking requests to the database and gives back the feedback
const { query } = require("../utils/pgHelper");

//creating a new booking
exports.createBooking = async (
  username,
  email,
  phone,
  payment_code,
  checkin,
  checkout,
  guests,
  room
) => {
  const result = await query(
    `INSERT INTO smartygrand_bookings 
    (username, email, phone, payment_code, checkin, checkout, guests, room) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [username, email, phone, payment_code, checkin, checkout, guests, room]
  );
  return result;
};

//getting all bookings
exports.getAllBookings = async () => {
  const result = await query(
    "SELECT id, username, email, checkin, checkout, guests, created_at, room FROM smartygrand_bookings ORDER BY id DESC"
  );
  return result;
};

//Deleting a booking from the database
exports.deleteBooking = async (bookingId) => {
  const result = await query(
    "DELETE FROM smartygrand_bookings WHERE id = $1 RETURNING *",
    [bookingId]
  );

  return result;
};
