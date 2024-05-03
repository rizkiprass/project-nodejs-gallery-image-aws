const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from Authorization header

    if (!token) return res.status(401).send('Unauthorized');

    // Log the token for debugging
    console.log('JWT Token:', token);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT Verification Error:', err.message);
            return res.status(403).send('Forbidden');
        }
        
        // Log the decoded user for debugging
        console.log('Decoded User:', user);

        req.user = user;
        next();
    });
};


module.exports = authenticateToken;
