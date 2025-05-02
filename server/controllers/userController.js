// Placeholder for future user-related logic (e.g., profile updates)
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { query } = require("../utils/pgHelper");
const logger = require("../utils/logger");

// Get Current User
exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await query(
      "SELECT id, username, email FROM smartydb_users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(result.rows[0]);
  } catch (error) {
    logger.error(`Get current user error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn(
      `Profile update validation failed: ${JSON.stringify(errors.array())}`
    );
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email } = req.body;
  const userId = req.user.id;

  try {
    await query(
      "UPDATE smartydb_users SET username = $1, email = $2 WHERE id = $3",
      [username, email, userId]
    );

    logger.info(`Profile updated for user: ${userId}`);
    res.json({ message: "Profile updated successfully." });
  } catch (error) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ message: "Username or email already in use." });
    }
    logger.error(`Profile update error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const result = await query(
      "SELECT password FROM smartydb_users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Current password is incorrect." });
    }

    const saltRounds = process.env.NODE_ENV === "production" ? 12 : 10;
    const hashed = await bcrypt.hash(newPassword, saltRounds);

    await query("UPDATE smartydb_users SET password = $1 WHERE id = $2", [
      hashed,
      userId,
    ]);

    logger.info(`Password changed for user: ${userId}`);
    res.json({ message: "Password changed successfully." });
  } catch (error) {
    logger.error(`Password change error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete Account
exports.deleteAccount = async (req, res) => {
  const userId = req.user.id;

  try {
    await query("DELETE FROM smartydb_users WHERE id = $1", [userId]);

    logger.info(`User account deleted: ${userId}`);
    res.json({ message: "Account deleted successfully." });
  } catch (error) {
    logger.error(`Account deletion error: ${error.message}`);
    res.status(500).json({ message: "Internal server error." });
  }
};
