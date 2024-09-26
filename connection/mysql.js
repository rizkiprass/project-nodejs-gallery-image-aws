const mysql = require('mysql2');
require('dotenv').config();  // Load environment variables from .env file

// Determine the host based on the environment
const dbHost = process.env.NODE_ENV === 'production' ? process.env.DB_HOST_PRODUCTION : 'localhost';

// Database connection
const db = mysql.createConnection({
    host: dbHost,
    user: 'app',
    password: 'Admin123',
    database: 'imagesdb'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        throw err;
    }
    console.log(`Connected to database in ${process.env.NODE_ENV} mode`);
});

module.exports = { db };
