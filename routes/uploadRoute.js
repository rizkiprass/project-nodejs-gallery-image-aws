const express = require('express');
const multer = require('multer'); // Import multer middleware
const uploadController = require('../controllers/uploadController-2');
const router = express.Router();

// Set up multer middleware to handle form-data parsing
const upload = multer();

// Route for uploading an image
router.post('/', upload.single('image'), uploadController.uploadImage);

// router.get('/images', uploadController.getImages);

module.exports = router;
