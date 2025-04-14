const { StatusCodes } = require('http-status-codes');
const { createOrganizer } = require('../../../services/mongoose/users');

const createCMSOrganizer = async (req, res, next) => {
    try {
        const result = await createOrganizer(req);

        res.status(StatusCodes.CREATE).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

module.exports = { createCMSOrganizer };