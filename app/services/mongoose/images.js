const Images = require('../../api/v1/images/model');

const createImages = async (req) => { // kirim requestnya
    // kita cek dulu ada nggak yang request filenya
    const result = await Images.create({
        name: req.file
        // kalau filenya ada, lakuin req.file.filename, jadi kita ambil filenamenya
        ? `uploads/${req.file.filename}`
        // kalau ga ada, kasih default
        :  'uploads/avatar/default.jpeg'
    });

    return result;
};

module.exports = { createImages };
