const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const { ObjectId } = require('mongodb');

const User = new Schema({
    id: { type: ObjectId },
    username: {
        type: String,
        require: true,
    },
    phoneNumber: { type: String },
    email: { type: String, },
    password: { type: String, require: true },
    roleID: {
        type: String
    },
    isVerified: { type: Boolean, default: false },
    verificationCode: { type: String },
})

module.exports = mongoose.model('User', User);


/*

*/