const express = require('express');
const deleteController = require('../controllers/deleteController');  // Import delete controller
const router = express.Router();

// Route for deleting an image
router.delete('/:imageName', deleteController.deleteImage);  // Route untuk delete

module.exports = router;
