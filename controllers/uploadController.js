const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../config/aws-config');
const { db } = require('../connection/mysql');
require('dotenv').config();

exports.uploadImage = async (req, res) => {
    const file = req.file;

    // Determine the content type based on the file extension
    let contentType;
    if (file.originalname.endsWith('.jpg') || file.originalname.endsWith('.jpeg')) {
        contentType = 'image/jpeg';
    } else if (file.originalname.endsWith('.png')) {
        contentType = 'image/png';
    } else {
        // Handle unsupported file types if needed
        res.status(400).send('Unsupported file type');
        return;
    }

    // Upload file to S3 with specified content type
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: contentType  // Set the content type
    };

    try {
        await s3Client.send(new PutObjectCommand(params));

        // Generate S3 URL for the uploaded image based on the environment
        let imageUrl;
        if (process.env.NODE_ENV === 'production') {
            imageUrl = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${file.originalname}`;
        } else {
            imageUrl = `http://localhost:9000/${process.env.S3_BUCKET}/${file.originalname}`;
        }

        // Save metadata to MySQL database
        const imageMetadata = {
            name: file.originalname,
            url: imageUrl,
            // Add any additional metadata fields as needed
        };

        const query = 'INSERT INTO images SET ?';
        db.query(query, imageMetadata, (err, result) => {
            if (err) {
                console.error('Error saving image metadata to database:', err);
                res.status(500).send('Error saving image metadata to database');
            } else {
                console.log('Image metadata saved to database:', result);
                res.send('File uploaded successfully');
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading file to S3');
    }
};
