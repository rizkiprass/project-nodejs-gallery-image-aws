const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'app',
    password: 'app',
    database: 'image_gallery_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        throw err;
    }
    console.log('Connected to database');
});

module.exports = { db };
