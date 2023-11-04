const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const { ObjectId } = require('mongodb');

const Category = new Schema({
    id: { type: ObjectId },
    image: {
        //  type: new Blob("long"),
        },
    name: {
         type: String,
        },

})

module.exports = mongoose.model('Category', Category);
