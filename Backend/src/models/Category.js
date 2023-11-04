const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const { ObjectId } = require('mongodb');

const User = new Schema({
    id: { type: ObjectId },
    image: {
         type: Blob("long"),
        },
    name: {
         type: String,
        },

})

module.exports = mongoose.model('User', User);
