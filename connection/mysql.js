const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'app',
    password: 'Admin123',
    database: 'images'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        throw err;
    }
    console.log('Connected to database');
});

module.exports = { db };
