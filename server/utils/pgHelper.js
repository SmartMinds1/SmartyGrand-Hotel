const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// Test the connection
pool
  .connect()
  .then(() => console.log("PostgreSQL connected successfully!"))
  .catch((err) => console.error("PostgreSQL connection error:", err));

// Export the query function
const query = (text, params) => pool.query(text, params);

module.exports = { query };
