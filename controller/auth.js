const {StatusCodes} = require('http-status-codes');
const BadRequest = require('../errors/bad-request');
const Unauthenticated = require('../errors/unauthenticated');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const registerCreate = async (req,res) => {
    const {name,email,password} = req.body;
    //values check
    if(!name || !email || !password){
        throw new BadRequest('Please provide name, email and password');
    }
    const obj = await User.find({email});
    if(obj.length>=1) throw new BadRequest('Email is already registered');

    const user = await User.create({...req.body});
    res.status(StatusCodes.CREATED).json({ user });
}

const login = async (req,res) =>{
    const {email,password} = req.body;
    if(!email || !password) throw new BadRequest('Provide valid email & password');
    const user = await User.findOne({email});
    if(!user) throw new Unauthenticated('Invalid User');
    const IspasswordValid =  await user.passwordCompare(password);
    if(!IspasswordValid) throw new Unauthenticated('Invalid User');

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: {name : user.name}, token});
}

const registerGetAllUser = async (req,res) => {
    const user = await User.find({});
    res.status(StatusCodes.OK).json({ user });
}


module.exports = {
    registerCreate,
    registerGetAllUser,
    login
};
