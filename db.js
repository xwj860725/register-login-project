require('dotenv').config(); // Load the configuration in the file ".env "
const mysql = require('mysql2'); // Import mysql2 packages

// Create a database connection pool using the configuration in file ".env"
const pool = mysql.createPool({
    host: process.env.DB_HOST, // Load from environment variable
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise(); // Export Connection Pool

