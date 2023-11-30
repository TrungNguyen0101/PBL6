const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const { ObjectId } = require('mongodb');

const Pay = new Schema({
    id: { type: ObjectId },
    id_book: { type: ObjectId },
    id_user: { type: ObjectId },
    address: { type: String },
}, { timestamps: true, })

module.exports = mongoose.model('Pay', Pay);


