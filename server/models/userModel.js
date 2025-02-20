//Interacts with the database for user-related queries

const pool = require("../db");

/**
 * Finds a user by their username.
 * @param {string} username - The username to search for.
 * @returns {object|null} The user object if found, or null if not.
 */
const findUserByUsername = async (username) => {
  try {
    const conn = await pool.getConnection();
    const [rows] = await conn.query(
      "SELECT * FROM smartydb_users WHERE username = ?",
      [username]
    );
    conn.release();
    return rows[0] || null; // Explicitly return null if no user is found
  } catch (error) {
    console.error(`Error finding user by username: ${error.message}`);
    throw new Error("Database query failed.");
  }
};

/**
 * Updates the refresh token for a specific user.
 * @param {string} refreshToken - The new refresh token.
 * @param {number} userId - The ID of the user.
 * @returns {boolean} True if the update was successful, otherwise false.
 */
const updateRefreshToken = async (refreshToken, userId) => {
  try {
    const conn = await pool.getConnection();
    const [result] = await conn.query(
      "UPDATE smartydb_users SET refresh_token = ? WHERE id = ?",
      [refreshToken, userId]
    );
    conn.release();
    return result.affectedRows > 0; // Return true if at least one row was updated
  } catch (error) {
    console.error(`Error updating refresh token: ${error.message}`);
    throw new Error("Database query failed.");
  }
};

module.exports = { findUserByUsername, updateRefreshToken };
