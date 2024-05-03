const express = require('express');
const getController = require('../controllers/getController');
const router = express.Router();

// Route for retrieving images
router.get('/', getController.getImages);

module.exports = router;
