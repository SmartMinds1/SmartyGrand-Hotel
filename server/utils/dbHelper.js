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
    logger.info(
      `Executing query: ${query} with params: ${JSON.stringify(params)}`
    );
    const result = await conn.query(query, params);
    return result;
  } catch (error) {
    logger.error(`Database query error: ${error.message}`);
    throw error; // Re-throw the error to be handled in the controller
  } finally {
    if (conn) conn.release(); // Ensure connection is released
  }
};

/**
 * Executes multiple queries within a transaction.
 * Rolls back if any query fails.
 * @param {Array} queries - Array of { query: string, params: Array } objects.
 * @returns {Promise<{ success: boolean }>} - Transaction success status.
 */
const executeTransaction = async (queries) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    for (const { query, params } of queries) {
      logger.info(
        `Executing transaction query: ${query} with params: ${JSON.stringify(
          params
        )}`
      );
      await conn.query(query, params);
    }

    await conn.commit();
    logger.info("Transaction committed successfully.");
    return { success: true };
  } catch (error) {
    if (conn) await conn.rollback();
    logger.error(`Transaction failed: ${error.message}`);
    throw error;
  } finally {
    if (conn) conn.release();
  }
};

module.exports = { executeQuery, executeTransaction };
