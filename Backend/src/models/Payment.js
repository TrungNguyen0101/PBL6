const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const { ObjectId } = require('mongodb');

const Payment = new Schema({
    id: { type: ObjectId },
    id_order: { type: ObjectId },
    id_user: { type: ObjectId },
    totalmoney: { type: String },
    note: { type: String },
    vnp_response_code: { type: Number },
    code_vnpay: { type: Number },
    code_bank: { type: String },
}, { timestamps: true, })

module.exports = mongoose.model('Payment', Payment);


