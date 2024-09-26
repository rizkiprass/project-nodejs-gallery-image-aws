require('dotenv').config(); // Load environment variables from .env file
const { S3Client } = require('@aws-sdk/client-s3');

// Create an S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    endpoint: process.env.NODE_ENV !== 'production' ? "http://127.0.0.1:9000" : undefined,
    s3ForcePathStyle: process.env.NODE_ENV !== 'production' // Only force path style in development
});

module.exports = { s3Client };
