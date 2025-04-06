// Jadikan satu disini, supaya bisa panggil semuanya langsung
const CustomAPIError = require('./custom-api-error');
const BadRequestError = require('./bad-request');
const NotFoundError = require('./not-found');

module.exports = {
    CustomAPIError,
    BadRequestError,
    NotFoundError,
};
