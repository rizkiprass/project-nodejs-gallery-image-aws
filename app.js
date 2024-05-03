const express = require('express');
const uploadRoute = require('./routes/uploadRoute');
const imageRoutes = require('./routes/imageRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();
const port = 8081;
const cors = require('cors'); // Impor cors
const authenticateToken = require('./middleware/authMiddleware'); // Import the middleware


// Middleware to parse JSON bodies
app.use(express.json());
// Gunakan middleware cors
app.use(cors());

// Routes
app.use('/upload', authenticateToken, uploadRoute);
app.use('/images', authenticateToken, imageRoutes); // Mount the image routes
// app.use('/login', authController);
// app.use('/register', authController);
// app.use('/login', authRoutes);
// app.use('/register', authRoutes);
app.use('/auth', authRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
