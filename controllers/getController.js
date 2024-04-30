const { db } = require('../connection/mysql');

exports.getImages = (req, res) => {
    // Query the database to retrieve images
    const query = 'SELECT * FROM images';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving images from database:', err);
            res.status(500).send('Error retrieving images from database');
        } else {
            // If images are found, send them as a response
            res.json(results);
        }
    });
};