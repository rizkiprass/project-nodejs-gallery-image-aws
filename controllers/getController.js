const { db } = require('../connection/mysql');
const redis = require('redis');

// Buat Redis client
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

// Pastikan Redis terhubung
redisClient.connect().catch(err => {
    console.error('Could not connect to Redis', err);
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

exports.getImages = async (req, res) => {
    try {
        // Cek apakah data gambar sudah ada di Redis cache
        const cacheData = await redisClient.get('images');
        if (cacheData) {
            // Jika data ada di Redis, kirim data dari cache
            console.log('Mengambil data dari Redis cache');
            return res.json(JSON.parse(cacheData)); // Parse data dari Redis
        } else {
            // Jika tidak ada di Redis, ambil dari MySQL
            const query = 'SELECT * FROM images';
            db.query(query, (err, results) => {
                if (err) {
                    console.error('Error retrieving images from database:', err);
                    return res.status(500).send('Error retrieving images from database');
                }

                // Simpan hasil query ke Redis cache, dengan TTL 1 jam (3600 detik)
                redisClient.setEx('images', 60, JSON.stringify(results));

                // Kirim data dari MySQL ke client
                console.log('Mengambil data dari MySQL dan menyimpannya di Redis cache');
                res.json(results);
            });
        }
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
};
