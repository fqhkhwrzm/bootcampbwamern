const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    urlDb: process.env.URL_MONGODB_DEV,
    // buat expired token loginnya selama 24 jam
    jwtExpiration: '24h',
    jwtSecret: 'jwtSecret',
}