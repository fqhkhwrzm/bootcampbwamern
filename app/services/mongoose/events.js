const Events = require('../../api/v1/events/model');
const { checkingImage } = require('./images');
const { checkingCategories } = require('./categories');
const { checkingTalents } = require('./talents')
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllEvents = async (req) => {
    const { keyword, category, talent } = req.query;
    let condition = {};

    if (keyword) {
        condition = { ...condition, title: { $regex: keyword, $options: 'i' } };
    }

    if (category) {
        condition = { ...condition, category: category };
    }

    if (talent) {
        condition = { ...condition, talent: talent };
    }

    // ada relasi ke 3 tabel, image, category, dan talent
    const result = await Events.find(condition)
    .populate({ path: 'image', select: '_id name' })
    .populate({ 
        path: 'category',
        select: '_id name',
    })
    .populate({ 
        path: 'talent',
        select: '_id name role image',
        populate: { path: 'image', select: '_id name' },
    });

    return result;
};

const createEvents = async (req) => {
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    } = req.body;

    // cari image, category, dan talent dengan field id
    await checkingImage(image);
    await checkingCategories(category);
    await checkingTalents(talent);

    // cari events dengan field name
    const check = await Events.findOne({ title });

    if (check) throw new BadRequestError('Judul event sudah ada');

    const result = await Events.create({
        title,
        date, 
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    })

    return result;
};

const getOneEvents = async (req) => {
    const { id } = req.params;

    const result = await Events.findOne({ _id: id })
    .populate({ path: 'image', select: '_id name' })
    .populate({
        path: 'category',
        select: '_id name',
    })
    .populate({
        path: 'talent',
        select: '_id name role image',
        populate: { path: 'image', select: '_id name' },
    });

    if (!result) throw new NotFoundError(`Tidak ada acara dengan id: ${id}`);

    return result;
};

const updateEvents = async (req) => {
    const { id } = req.params;
    const {
        title,
        date,
        about,
        tagline,
        venueName,
        keyPoint,
        statusEvent,
        tickets,
        image,
        category,
        talent,
    } = req.body;

    // cari image, category, talent dengan field id
    await checkingImage(image);
    await checkingCategories(category);
    await checkingTalents(talent);
    
    // cari event berdasarkan field id
    const checkEvent = await Events.findOne({
        _id: id,
    });

    if (!checkEvent) throw new NotFoundError(`Tidak ada event dengan id: ${id}`);

    // cari events dengan field name dan id selain yang dikirim dari params
    const check = await Events.findOne({
        title,
        _id: { $ne: id },
    });

    if (check) throw new BadRequestError('Judul acara sudah terdaftar');

    const result = await Events.findOneAndUpdate(
        { _id: id},
        {
            title,
            date,
            about,
            tagline,
            venueName,
            keyPoint,
            statusEvent,
            tickets,
            image,
            category,
            talent,
        },
        { new: true, runValidators: true}
    );

    return result;
};

const deleteEvents = async (req) => {
    const { id } = req.params;

    const result = await Events.findOne({
        _id: id,
    });

    if (!result) throw new NotFoundError(`Tidak ada acara dengan id: ${id}`);

    await result.deleteOne();

    return result;
};

module.exports = {
    getAllEvents,
    getOneEvents,
    createEvents,
    updateEvents,
    deleteEvents,
};