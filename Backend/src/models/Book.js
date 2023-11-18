const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookModal = new Schema({
  booktitle: { type: String },
  author: { type: String },
  price: { type: Number },
  quantity: { type: String },
  datePicker: { type: Date },
  desc: { type: String },
  category: { type: String },
  mainImage: { type: Array },
  descImage: { type: Array },
  publisher: { type: String },
  infomation: { type: String },
  language: { type: Array },
});

module.exports = mongoose.model("Book", BookModal);
