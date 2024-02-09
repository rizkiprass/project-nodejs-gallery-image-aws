const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../config/awsConfig');

exports.uploadImage = async (req, res) => {
    const file = req.file;

    // Upload file to S3
    const params = {
        Bucket: 'image-s3-8347',
        Key: file.originalname,
        Body: file.buffer
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        res.send('File uploaded successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading file to S3');
    }
};
