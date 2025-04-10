const Talents = require('../../api/v1/talents/model');
const { checkingImage } = require('./images');

// import custom error not found sama bad request
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllTalents = async (req) => {
    // saat kita get all talents, otomatis bakal ngirim keyword / filter pencarian berdasar name
    const { keyword } = req.query;

    // conditional itu kosong, ini buat ngecek, semua objek yang mau kita filter kita masukin ke opsional
    // tujuannya biar ga ke filter
    let condition = {}; // secara umum berfungsi untuk menampung semua data yang mau kita filter

    if (keyword) {
        // filter berdasar name, regexnya sesuai keyword, ada options i untuk manipulasi stringnya, hruf besar kecil dianggap sama (bawaan mongoose_)
        condition = { ...condition, name: { $regex: keyword, $options: 'i' } };
    }

    // kemudian baru ambil datanya
    const result = await Talents.find(condition)
    // populate untuk nampilin semua datanya kalau relasi, tapi kalau kita spesifik, kaya dibawah ini
    .populate({
        // kita path dulu, path berdsar referensi dari field image yang ada di talent
        path: 'image',
        select: '_id name',
    })
    .select('_id name role image'); // fungsi select disini untuk nampilin data talentnya

    // nunggu proses await diatas selesai dahulu baru di return
    return result;
};

const createTalents = async (req) => {
    const { name, role, image } = req.body;

    // cari image dengan field image, cek id nya ada tidak
    await checkingImage(image);

    // cari talents dengan field name
    const check = await Talents.findOne({ name });

    // apabila check true/data talents sudah ada, tampilin bad request
    if (check) throw new BadRequestError('pembicara sudah terdaftar');

    const result = await Talents.create({ name, image, role });

    return result
}

const getOneTalents = async (req) => {
    const { id } = req.params;

    const result = await Talents.findOne({ _id: id })
    .populate({
        path: 'image',
        select: '_id name',
    })
    .select('_id name role image');

    if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`);

    return result;
};

const updateTalents = async(req) => {
    const { id } = req.params;
    const { name, image, role } = req.body;

    // cari image dengan field image, buat ngecek id image nya ada tidak
    await checkingImage(image);

    // cari talents dengan field nama dan id selain yang dikirim dari params
    const check = await Talents.findOne({
        name,
        // $ne = not equal, yang dicari selain id "ini"
        _id: { $ne: id },
    });

    if (check) throw new BadRequestError('Pembicara sudah terdaftar');

    // result isinya ini:
    const result = await Talents.findOneAndUpdate(
        { _id: id},
        { name, image, role},
        { new: true, runValidators: true}
    );

    // apabila id result false/null maka akan menampilkan error
    if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id ${id}`);

    return result;
};

const deleteTalents = async (req) => {
    const { id } = req.params;

    const result = await Talents.findOne({
        _id: id,
    });

    if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id ${id}`);

    await result.deleteOne();

    return result;
}

const checkingTalents = async (id) => {
    const result = await Talents.findOne({_id: id});

    if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id: ${id}`);

    return result;
};

module.exports = {
    getAllTalents,
    createTalents,
    getOneTalents,
    updateTalents,
    deleteTalents,
    checkingTalents,
}