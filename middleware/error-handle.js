const { StatusCodes } = require('http-status-codes');
const {CustomAPI} = require('../errors');

const errorHandleMiddleware = (err,req,res,next) => {
    if(err instanceof CustomAPI) {
        return res.status(err.StatusCodes).json({msg : err.message});
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: err});
}

module.exports = errorHandleMiddleware;