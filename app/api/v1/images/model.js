const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let imageSchema = Schema (
    {
        // bisa diubah url/name
        name: { type: String }, 
        // tidak punya validasi schema
        // kalau ga mau upload image nanti kasih default imagenya
    },
    { timestamps: true }
);

module.exports = model('Image', imageSchema);