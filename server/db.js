//Database connection pool setup
const mariadb = require("mariadb");
const logger = require("./utils/logger"); // Use logger for better logging

const pool = mariadb.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "auth_user",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_NAME || "auth_db",
  connectionLimit: 10, // Maximum number of connections in the pool
  acquireTimeout: 10000, // 10 seconds to acquire a connection before throwing an error
});

// Test database connection
(async () => {
  try {
    const conn = await pool.getConnection();
    logger.info("Connected to the database");
    conn.release(); // Always release the connection after testing
  } catch (err) {
    logger.error(`Database connection failed: ${err.message}`);
    process.exit(1); // Exit process on failure
  }
})();

// Handle pool connection errors
pool.on("error", (err) => {
  logger.error(`Database connection error: ${err.message}`);
});

module.exports = pool;
