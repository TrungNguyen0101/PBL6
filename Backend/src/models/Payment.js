const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const { ObjectId } = require('mongodb');

const Payment = new Schema({
    id: { type: ObjectId },
    orderId: { type: String },
    totalmoney: { type: String },
    note: { type: String },
    vnp_response_code: { type: Number },
    code_vnpay: { type: Number },
    code_bank: { type: String },
    time: { type: String }
}, { timestamps: true, })

module.exports = mongoose.model('Payment', Payment);


