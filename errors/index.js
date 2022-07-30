const CustomAPI = require('./custom-api');
const Badrequest = require('./bad-request');
const NotFound = require('./not-found');
const Unauthenticated =require('./unauthenticated');

module.exports = {
    CustomAPI,
    Badrequest,
    NotFound,
    Unauthenticated
};