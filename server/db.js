// Database connection setup for PostgreSQL
const { Pool } = require("pg");
const logger = require("../utils/logger");

const pool = new Pool({
  user: process.env.PG_USER || "smartminds",
  host: process.env.PG_HOST || "localhost",
  database: process.env.PG_DATABASE || "smartygrand_hotel",
  password: process.env.PG_PASSWORD || "your_password",
  port: process.env.PG_PORT || 5432,
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 10000, // 10 seconds timeout for acquiring a connection
});

// Test database connection
(async () => {
  try {
    const client = await pool.connect();
    logger.info("Connected to PostgreSQL database");
    client.release();
  } catch (err) {
    logger.error(`PostgreSQL connection failed: ${err.message}`);
    process.exit(1);
  }
})();

// Handle pool connection errors
pool.on("error", (err) => {
  logger.error(`PostgreSQL connection error: ${err.message}`);
});

// Graceful shutdown handling
process.on("SIGINT", async () => {
  try {
    logger.info("Closing PostgreSQL connection pool...");
    await pool.end();
    logger.info("PostgreSQL pool closed.");
    process.exit(0);
  } catch (err) {
    logger.error(`Error closing PostgreSQL pool: ${err.message}`);
    process.exit(1);
  }
});

module.exports = pool;
