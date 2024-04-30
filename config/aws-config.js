require('dotenv').config(); // Load environment variables from .env file
const { S3Client } = require('@aws-sdk/client-s3');

const useLocal = process.env.NODE_ENV !== 'production';

// Specify the endpoint for MinIO
const endpoint = useLocal ? 'http://127.0.0.1:9000' : 'https://s3.amazonaws.com';

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    endpoint: endpoint,
    s3ForcePathStyle: true, // Set to true to use path-style addressing
});

module.exports = { s3Client };