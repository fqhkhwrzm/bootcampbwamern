const Users = require('../../api/v1/users/model');
const Organizers = require('../../api/v1/organizers/model');
const {BadRequestError} = require('../../errors');

const createOrganizer = async(req) => {
    const {organizer, role, email, password, confirmPassword, name} = req.body;
    
    if (password !== confirmPassword) {
        throw new BadRequestError('Password dan confirmPassword tidak cocok');
    }

    const result = await Organizers.create({ organizer });

    const users = await Users.create({
        email,
        name,
        password,
        organizer: result._id,
        role,
    });

    // _doc dia akan memanipulasi data yang ada di hasil result itu, jadi hasilnya itu, kalau kita pakai _doc biar bisa ngehapus pw nya
    // kita perlu delete pw agar tidak tampil di responnya
    delete users._doc.password;

    return users;
};

const createUsers = async (req, res) => {
    const { name, password, role, confirmPassword, email } = req.body;
    
    if (password !== confirmPassword) {
        throw new BadRequestError('Password dan confirmPassword tidak cocok');
    }

    const result = await Users.create({
        name, 
        email,
        organizer: req.user.organizer, // waktu create user, organizer ini didapat dari user yang login
        password,
        role,
    });

    return result;
}

module.exports = { createOrganizer, createUsers };