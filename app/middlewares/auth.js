const { UnauthenticatedError, UnauthorizedError } = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
    try {
        let token;
        // cek header
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1];
        }

        if (!token) {
            throw new UnauthenticatedError('Authentication invalid');
        }

        const payload = isTokenValid({ token });

        // Lampirkan user dan izinnya ke objek req
        req.user = {
            email: payload.email,
            role: payload.role,
            name: payload.name,
            organizer: payload.organizer,
            id: payload.id,
        };

        next();
    } catch (error) {
        next(error);
    }
};

// buat middleware, kemudian punya spread operator roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // fungsi dr includes ini bawaan dari js untuk ngefilter, dia ngecek ada nggak role yang dikirim
        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError('Unauthorized to acces this route')
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRoles };