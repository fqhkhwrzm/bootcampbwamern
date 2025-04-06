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

module.exports = {getAllCategories, createCategories};