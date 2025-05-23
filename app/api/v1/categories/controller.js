const { StatusCodes } = require('http-status-codes');
// const Categories = require('./model'); // kita delete model krn udah ga dipakai, krn semuanya udah ada di service
const { getAllCategories, createCategories, getOneCategories, updateCategories, deleteCategories } = require('../../../services/mongoose/categories');

const create = async(req, res, next) => {
    try {
        const result = await createCategories(req);

        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const index = async(req, res, next) => {
    try{
        // const result = await getAllCategories();
        // pakai req untuk nampilin data berdasar user yang login, kita kirim request
        const result = await getAllCategories(req);
        
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

const find = async(req, res, next) => {
    try {
        // const { id } = req.params;
        const result = await getOneCategories(req);
        // if (!result) {
        //     return res.status(404).json({ message: 'Id Category tidak ditemukan' });
        // }
        
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async(req, res, next) => {
    try {
        // kita cek dulu ID mana yang mau di update
        // const {id} = req.params;
        // const {name} = req.body;
        // const checkingCategories = await Categories.findOne({ _id: id });
        // if (!checkingCategories) {
        //     return res.status(404).json({ message: 'Id Categories Tidak Ditemukan'});
        // }
        // untuk update, ambil nama
        // checkingCategories.name = name;
        // await checkingCategories.save();
        const result = await updateCategories(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const destroy = async(req, res, next) => {
    try {
        // const { id } = req.params;
        // const result = await Categories.findByIdAndDelete(id);
        const result = await deleteCategories(req);
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    find,
    create, 
    update,
    destroy,
}