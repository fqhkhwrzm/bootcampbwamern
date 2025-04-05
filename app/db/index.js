// 1] import dulu mongoose
const mongoose = require('mongoose');

// 2] import konfigurasi terkait MongoDB dari app/config/index.js
const { urlDb } = require('../config');

// 3] connect ke MongoDb pakai konfigurasi yang udah diimport
mongoose.connect(urlDb);

// 4] simpan koneksinya kedalam constant db
const db = mongoose.connection;

// 5] export db agar bisa dipakai oleh file lain yang membutuhkan
module.exports = db;