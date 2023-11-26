const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require("mongodb");

const OrderSchema = new Schema({
  IdAccount: { type: String },
  Book: { type: Object },
  status: { type: Number, default: 0 },
  PriceDiscount: { type: String },
  Count: { type: Number },
});
module.exports = mongoose.model("Order", OrderSchema);
