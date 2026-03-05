const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'switchyard.proxy.rlwy.net',
    port: 58584,
    user: 'root',
    password: 'AetVBefiVEAmwCZWmAbAGrdOoIuYxFfm',
    database: 'railway',
    waitForConnections: true
};

const pool = mysql.createPool(dbConfig);

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
