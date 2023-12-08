const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require("mongodb");

const History = new Schema(
  {
    id_user: { type: ObjectId },
    id_book: { type: Object },
    phone: { type: Number },
    address: { type: String },
    price: { type: Number },
    payment_method: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("History", History);
