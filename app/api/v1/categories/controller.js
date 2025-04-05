const Categories = require('./model');
const create = async(req, res, next) => {
    try {
        const {name} = req.body;
        const result = await Categories.create({ name });
        res.status(201).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const index = async(req, res, next) => {
    try{
        const result = await Categories.find().select('_id name');
        res.status(200).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
}

const find = async(req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Categories.findOne({ _id: id });

        if (!result) {
            return res.status(404).json({ message: 'Id Category tidak ditemukan' });
        }
        
        res.status(200).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async(req, res, next) => {
    try {
        // kita cek dulu ID mana yang mau di update
        const {id} = req.params;
        const {name} = req.body;

        const checkingCategories = await Categories.findOne({ _id: id });

        if (!checkingCategories) {
            return res.status(404).json({ message: 'Id Categories Tidak Ditemukan'});
        }

        // untuk update, ambil nama
        checkingCategories.name = name;
        await checkingCategories.save();
        res.status(200).json({
            data: checkingCategories,
        });
    } catch (err) {
        next(err);
    }
}

const destroy = async(req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Categories.findByIdAndDelete(id);
        res.status(200).json({
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