const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const { ObjectId } = require('mongodb');

const Category = new Schema({
    id: { type: ObjectId },
    image: {
         type: Buffer,
         require : true,
        },
    name: {
         type: String,
         require : true,
        },

})

module.exports = mongoose.model('Category', Category);
