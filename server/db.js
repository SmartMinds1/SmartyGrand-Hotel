const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "auth_user",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_NAME || "auth_db",
  connectionLimit: 10,
});

// Test database connection
pool
  .getConnection()
  .then(() => console.log("Connected to the database"))
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Exit process on failure
  });

// Handle pool connection errors
pool.on("error", (err) => {
  console.error("Database connection error:", err);
});

module.exports = pool;
