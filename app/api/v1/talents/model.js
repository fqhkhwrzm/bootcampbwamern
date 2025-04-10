const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let talentSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Nama harus diis'],
        }, 
        role: {
            type: String,
            default: '-',
        },
        // Untuk membuat relasi pada mongodb, kita perlu membuat types ObjectId
        image: {
            type: mongoose.Types.ObjectId, // dengan Object id, bakal tau bentuknya uuid
            ref: 'Image', // reference
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = model('Talent', talentSchema);