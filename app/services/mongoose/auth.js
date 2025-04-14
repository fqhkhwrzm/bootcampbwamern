const Users = require('../../api/vi/users/model');
const { BadRequestError, UnauthorizedError } = require('../../errors');
const { createTokenUser, createJWT } = require('../../utils');

const signin = async (req) => {
    // waktu login mengirim 2 field email dan pass
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    // kemudian cari didalam collection ada tidak emailnya
    const result = await Users.findOne({ email: email });

    if (!result) {
        throw new UnauthorizedError('Invalid Credentials')
    }

    // setelah dapat datanya, cek dulu pass nya poke fungsi comparePassword 
    const isPasswordCorrect = await result.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    // kalau true, akan mengenerate token 
    const token = createJWT({ payload: createTokenUser(result) });

    return token;
};

module.exports = { singin };