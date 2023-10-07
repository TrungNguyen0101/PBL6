const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BookModal = new Schema({
    Name_Category: { type: String },
    Name: { type: String },
    Price: { type: Number },
    Author: { type: String },
    Desc: { type: String },
})

module.exports = mongoose.model('Book', BookModal);
