// const { PutObjectCommand } = require('@aws-sdk/client-s3');
// const { s3Client } = require('../config/aws-config');
// const { db } = require('../connection/mysql');

// exports.uploadImage = async (req, res) => {
//     // Extract the image file from the request
//     const file = req.file;

//     // Check if a file was uploaded
//     if (!file) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     // Upload file to S3
//     const params = {
//         Bucket: process.env.S3_BUCKET_NAME,
//         Key: file.originalname,
//         Body: file.buffer, // Use the buffer directly
//         ContentType: file.mimetype // Set the content type based on the uploaded file's mimetype
//     };

//     try {
//         await s3Client.send(new PutObjectCommand(params));
        
//         // Save metadata to MySQL
//         const imageUrl = `http://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${file.originalname}`;
//         const sql = 'INSERT INTO images (name, url) VALUES (?, ?)';
//         db.query(sql, [file.originalname, imageUrl], (err, result) => {
//             if (err) {
//                 console.error('Error saving image metadata to database: ', err);
//                 res.status(500).json({ error: 'Failed to save image metadata to database' });
//             } else {
//                 console.log('Image metadata saved to database');
//                 res.send('File uploaded successfully');
//             }
//         });
//     } catch (error) {
//         console.error('Error uploading file to S3: ', error);
//         res.status(500).json({ error: 'Failed to upload file to S3' });
//     }
// };

// exports.getImages = (req, res) => {
//     const sql = 'SELECT url FROM images';
//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Error fetching images from database: ', err);
//             res.status(500).json({ error: 'Failed to fetch images from database' });
//         } else {
//             const urls = results.map(result => result.url);
//             res.json(urls);
//         }
//     });
// };