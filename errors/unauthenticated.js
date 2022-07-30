const {StatusCodes, UNAUTHORIZED}=require('http-status-codes');
const CustomAPI = require('./custom-api');

class Unauthenticated extends CustomAPI {
    constructor(message) {
        super(message);
        this.StatusCodes = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = Unauthenticated;