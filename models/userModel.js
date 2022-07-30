require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please provide name'],
        minlength : 4,
        maxlength : 20
    },
    email : {
        type : String,
        required : [true, 'Please provide email'],
        minlength : 6,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique : true,
    },
    password : {
        type : String,
        required : [true, 'please provide password']
    }
},{timestamps: true});

userSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.createJWT = function() {
    const token = jwt.sign({
        userId : this._id, name: this.name},
        process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME
    });
    return token;
}
    userSchema.methods.passwordCompare = async function (comparePassword)  {
    const IsMatch = await bcrypt.compare(comparePassword,this.password);
    return IsMatch;
}

module.exports = mongoose.model('user', userSchema);
