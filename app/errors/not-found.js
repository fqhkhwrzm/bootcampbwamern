const { StatusCode } = require('http-status-codes');
const CustomAPIError = require('./custom-api-error');

class NotFound extends CustomAPIError {
    constructor(message) {
        super(message);
        // Memberikan statuscode not found--404
        this.StatusCode = StatusCode.NOT_FOUND
    }
}

module.exports = NotFound;