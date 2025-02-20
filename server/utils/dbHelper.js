// utils/dbHelper.js

const pool = require("../db");
const logger = require("./logger");

/**
 * Executes a query using the database connection pool.
 * Automatically handles connection release.
 * @param {string} query - The SQL query to execute.
 * @param {Array} params - The parameters for the query.
 * @returns {Promise<any>} - The result of the query.
 */
const executeQuery = async (query, params = []) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(query, params);
    return result;
  } catch (error) {
    logger.error(`Database query error: ${error.message}`);
    throw error; // Re-throw the error to be handled in the controller
  } finally {
    if (conn) conn.release(); // Ensure connection is released
  }
};

module.exports = { executeQuery };
