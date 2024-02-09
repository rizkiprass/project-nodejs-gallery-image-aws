const express = require('express');
const uploadRoute = require('./routes/uploadRoute');
const imageRoutes = require('./routes/imageRoutes');
const app = express();
const port = 8080;
const cors = require('cors'); // Impor cors

// Middleware to parse JSON bodies
app.use(express.json());
// Gunakan middleware cors
app.use(cors());


// Routes
app.use('/upload', uploadRoute);
app.use('/', imageRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
