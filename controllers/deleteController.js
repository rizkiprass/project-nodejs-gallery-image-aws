const { DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { s3Client } = require('../config/aws-config');
const { db } = require('../connection/mysql');
require('dotenv').config();

exports.deleteImage = async (req, res) => {
    const { imageName } = req.params; // Nama file gambar yang akan dihapus

    // Hapus file dari S3
    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: imageName,  // Nama file yang akan dihapus dari S3
    };

    try {
        // Hapus gambar dari S3
        await s3Client.send(new DeleteObjectCommand(params));
        console.log(`File ${imageName} deleted from S3`);

        // Hapus metadata gambar dari MySQL
        const query = 'DELETE FROM images WHERE name = ?';
        db.query(query, [imageName], (err, result) => {
            if (err) {
                console.error('Error deleting image metadata from database:', err);
                res.status(500).send('Error deleting image metadata from database');
            } else {
                console.log('Image metadata deleted from database:', result);
                res.send(`File ${imageName} deleted successfully`);
            }
        });
    } catch (err) {
        console.error('Error deleting file from S3:', err);
        res.status(500).send(`Error deleting file from S3: ${err.message}`);
    }
};