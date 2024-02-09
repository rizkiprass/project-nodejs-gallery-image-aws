const express = require('express');
const cors = require('cors');
const uploadRoute = require('./routes/uploadRoute');

const app = express();
const port = 8080;

// Allow requests from all origins
app.use(cors());

// Middleware
app.use('/upload', uploadRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
