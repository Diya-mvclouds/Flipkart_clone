const mysql = require('mysql2/promise');

// Database
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'flipkart',
    waitForConnections: true,
};

// connection pool
const pool = mysql.createPool(dbConfig);

// Test connection
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully!');
        connection.release();
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
}

module.exports = { pool, testConnection };