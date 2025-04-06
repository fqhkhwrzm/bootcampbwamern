const Categories = require('../../api/v1/categories/model');
const {BadRequestError, NotFoundError} = require('../../errors');

const getAllCategories = async() => {
    const result = await Categories.find();

    return result;
};

const createCategories = async(req) => {
    const {name} = req.body;

    // Cari categories dengan field name
    const check = await Categories.findOne({ name });

    // Apabila check true / data categories ada, maka kita tampilkan error bad request (karena no repeatable)
    if (check) throw new BadRequestError('Kategori nama sudah ada/duplikat');

    const result = await Categories.create({ name });

    return result;
}

const getOneCategories = async(req) => {
    const { id } = req.params;
    // untuk ngecek dulu pake await, dia gaboleh ngejalanin dibawahnya kalau proses const result ini blm selesai
    // Kalau ada baru kebawahnya
    const result = await Categories.findOne({_id: id});

    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);

    return result;
}

const updateCategories = async(req) => {
    const { id } = req.params;
    const { name } = req.body;

    // cari categories dengan field name dan id selain dari yang dikirim dari params
    const check = await Categories.findOne({
        name,
        _id: { $ne: id }, //$ne dia bakal cari disemua categories kecuali di id itu
    });

    // apabila check true/data categories sudah ada maka kita tampilkan error bad request
    if (check) throw new BadRequestError('Kategori nama duplikat');

    // kalau setelah dicek aman tidak ada duplikat, maka data diupdate
    const result = await Categories.findOneAndUpdate(
        {_id: id},
        {name},
        {new: true, runValidators: true}
    );

    // jika hasil result false / null (id salah) maka akan menampilkan error 'tidak ada kategori dengan id'
    if (!result) throw new NotFoundError(`Tidak ada kategori dengan id: ${id}`);

    return result;
}

module.exports = {getAllCategories, createCategories, getOneCategories, updateCategories};