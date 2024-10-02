const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../config/aws-config');
const redisClient = require('../connection/redis'); // Import redis client
const { db } = require('../connection/mysql');
require('dotenv').config();

exports.uploadImage = async (req, res) => {
    const file = req.file;

    // Tentukan content type berdasarkan ekstensi file
    let contentType;
    if (file.originalname.endsWith('.jpg') || file.originalname.endsWith('.jpeg')) {
        contentType = 'image/jpeg';
    } else if (file.originalname.endsWith('.png')) {
        contentType = 'image/png';
    } else {
        res.status(400).send('Unsupported file type');
        return;
    }

    // Upload file ke S3
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: contentType,
    };

    try {
        await s3Client.send(new PutObjectCommand(params));

        // Generate S3 URL
        let imageUrl;
        if (process.env.NODE_ENV === 'production') {
            imageUrl = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.originalname}`;
        } else {
            imageUrl = `http://localhost:9000/${process.env.S3_BUCKET}/${file.originalname}`;
        }

        // Simpan metadata gambar ke MySQL
        const imageMetadata = {
            name: file.originalname,
            url: imageUrl,
        };

        const query = 'INSERT INTO images SET ?';
        db.query(query, imageMetadata, async (err, result) => {
            if (err) {
                console.error('Error saving image metadata to database:', err);
                res.status(500).send('Error saving image metadata to database');
            } else {
                console.log('Image metadata saved to database:', result);

                // Ambil data terbaru dari MySQL setelah berhasil upload
                db.query('SELECT * FROM images', async (err, images) => {
                    if (err) {
                        console.error('Error retrieving images from database:', err);
                    } else {
                        // Perbarui cache Redis dengan data terbaru
                        await redisClient.setEx('images', 20, JSON.stringify(images)); // 3600 detik (1 jam)
                        console.log('Cache images diperbarui di Redis');
                    }
                });

                res.send('File uploaded successfully');
            }
        });
    } catch (err) {
        console.error('Error uploading file to S3:', err);
        res.status(500).send(`Error uploading file to S3: ${err.message}`);
    }
};
