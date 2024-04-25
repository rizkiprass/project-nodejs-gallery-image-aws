require('dotenv').config(); // Load environment variables from .env file
const { S3Client } = require('@aws-sdk/client-s3');

const useLocal = process.env.NODE_ENV !== 'production'
// Create an S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    endpoint: useLocal ? 'https://localhost.localstack.cloud:4566' : undefined,
    s3ForcePathStyle: true,
});

module.exports = { s3Client };