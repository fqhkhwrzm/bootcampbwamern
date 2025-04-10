const Images = require('../../api/v1/images/model');
const { NotFoundError } = require('../../errors');

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

// menerima 1 parameter, yaitu id (ada di async(id))
const checkingImage = async (id) => {
    const result = await Images.findOne({ _id: id });
    console.log(result);

    if (!result) throw new NotFoundError(`Tidak ada gambar dengan id: ${id}`);

    return result;
}

module.exports = { createImages, checkingImage };
