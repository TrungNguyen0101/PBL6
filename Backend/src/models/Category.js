const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = require("mongodb");

const Category = new Schema({
  value: {
    type: String,
    require: true,
  },
  label: {
    type: String,
    require: true,
  },
}, { timestamps: true, });

module.exports = mongoose.model("Category", Category);
