const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { ObjectId } = require('mongodb');

const OrderSchema = new Schema({
    id: { type: ObjectId },
    ID_Account: { type: String },
    OrderDate : {type: Date},
    Status : {type: String},
    Order_Address : {type:String},
    TotalPrice: { type: String },
})
module.exports = mongoose.model('Order',OrderSchema)
