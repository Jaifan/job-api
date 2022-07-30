require('dotenv').config();
const User = require('../models/userModel');
const { Unauthenticated } = require("../errors");
const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Unauthenticated('Authentication Invalid!');
    }
    const token = authHeader.split(' ')[1];
    try{  
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId : payload.userId, name : payload.name};
        next();
    }catch(err) {
        throw new Unauthenticated('Authentication Invalide');
    }

}

module.exports = auth;