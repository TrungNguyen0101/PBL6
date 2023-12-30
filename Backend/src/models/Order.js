const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require("mongodb");

const OrderSchema = new Schema({
  IdAccount: { type: String },
  Book: { type: Object },
  status: { type: Boolean, default: false },
  isPayment: { type: Boolean, default: false },
  PriceDiscount: { type: String },
  Count: { type: Number },
});
module.exports = mongoose.model("Order", OrderSchema);
