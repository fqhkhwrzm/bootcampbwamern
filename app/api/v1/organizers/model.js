const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let organizerSchema = Schema(
    {
        organizer: {
            type: String,
            required: [true, 'Penyelenggara harus diisi'],
        },
    },
    { timestamps: true }
);

modul.exports = model('Organizer', organizerSchema);