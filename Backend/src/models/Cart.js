const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = require("mongodb");

const CartSchema = new Schema(
  {
    IdAccount: { type: String },
    Book: { type: Object },
    status: { type: Number, default: 0 },
    PriceDiscount: { type: String },
    Count: { type: Number },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", CartSchema);
