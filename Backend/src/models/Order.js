const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const OrderSchema = new Schema({
    ID_Account: { type: String },
    Book: { type: Object }, 
    status: { type: Number, default: 0 },
    Price: { type: String },
    Count: { type: Number },
})
module.exports = mongoose.model('Order',OrderSchema)
