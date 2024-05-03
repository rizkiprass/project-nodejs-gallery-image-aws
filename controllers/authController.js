const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { db } = require('../connection/mysql');
require('dotenv').config();

exports.login = (req, res) => {
    const { username, password } = req.body;

    // Authenticate user (example using MySQL, adjust as needed)
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid username or password');
        }

        const user = results[0];
        try {
            if (await bcrypt.compare(password, user.password)) {
                const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
                return res.json({ accessToken });
            } else {
                return res.status(401).send('Invalid username or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).send('Internal Server Error');
        }
    });
};



exports.register = (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    const checkQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkQuery, [username], async (err, results) => {
        if (err) {
            console.error('Error during registration:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            return res.status(400).send('Username already exists');
        }

        // Hash the password
        try {
            const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

            // Insert new user into the database
            const insertQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.query(insertQuery, [username, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Error during registration:', err);
                    return res.status(500).send('Internal Server Error');
                }
                console.log('User registered successfully');
                const accessToken = jwt.sign({ username }, process.env.JWT_SECRET);
                return res.json({ accessToken });
            });
        } catch (error) {
            console.error('Error during registration:', error);
            return res.status(500).send('Internal Server Error');
        }
    });
};