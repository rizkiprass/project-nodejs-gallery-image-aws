const jwt = require('jsonwebtoken');
require('dotenv').config();

// A sample JWT token (replace with your actual token)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vZGUtdXNlciIsImlhdCI6MTcxNDcyNzE3OH0.2oYlQnlo2059Xj0-xm3XB-zGLEpoxUjzVwhL1ZwFl7k';

// Verify the token
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        console.error('Token verification failed:', err.message);
    } else {
        console.log('Token verification successful');
        console.log('Decoded token payload:', decoded);
    }
});
