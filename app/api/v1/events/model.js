const mongoose = require('mongoose');

// kategori tiket yang ini tidak mungkin digunakan di event yang lain, jadi taruh di 1 file, kecuali 1 tiket kita perbanyak eventnya. intinya 1 tiket cuma bisa 1 event, maka kita buat skemanya kaya gini:
const ticketCategoriesSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Tipe tiket harus diisi'],
    },
    price: {
        type: Number,
        default: 0,
    },
    stock: {
        type: Number,
        default: 0,
    },
    statusTicketCategories: {
        type: Boolean,
        enum: [true, false], // kalau false ga bakal tampil, gabisa beli 
        default: true,
    },
    expired: {
        type: Date,
    },
});

// skema untuk event nya itu sendiri
const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Judul harus diisi'],
        minlength: 3,
        maxlength: 50,
    },
    date: {
        type: Date,
        required: [true, 'Tanggal dan waktu harus diisi'],
    },
    about: {
        type: String,
    },
    tagline: {
        type: String,
        required: [true, 'Tagline harus diisi'],
    },
    keypoint: {
        type: [String],
    },
    venueName: {
        type: String,
        required: [true, 'Tempat acara harus diisi'],
    },
    statusEvent: {
        type: String,
        enum: ['Draft', 'Published'],
        default: 'Draft',
    },
    tickets: {
        type: [ticketCategoriesSchema], // karena tiket bisa banyak, ada tiket 1,2,dst, maka bentuknya array
        required: true,
    },
    image: {
        // krn hanya bisa 1, pakenya objek
        type: mongoose.Types.ObjectId,
        ref: 'Image',
        required: true,
    },
    category: {
        // krn hanya bisa 1, pakenya objek
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    talent: {
        // krn hanya bisa 1, pakenya objek
        type: mongoose.Types.ObjectId,
        ref: 'Talent',
        required: true,
    },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Event', EventSchema);
