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

module.exports = redisClient; // Ekspor redisClient
