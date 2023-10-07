const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const { ObjectId } = require('mongodb');
// import isEmail from 'validator/lib/isEmail.js'

const User = new Schema({
    id: { type: ObjectId },
    username: {
         type: String,
         require: true,
        //  validate : {
        //     validator : (value) => value.length > 3,
        //     message: "Username must be at least 3 characters"
        //  }
        },
    email: {
         type: String,
        //  validate : {
        //     validator : (value) => isEmail,
        //     message: "Email is incorrect format"
        //  }
        },
    password: { type: String, require:true},
})

module.exports = mongoose.model('User', User);
