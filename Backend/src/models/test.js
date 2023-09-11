const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Test = new Schema({
    name: { type: String },
    phone: { type: String },
    email: { type: String },
})

module.exports = mongoose.model('test', Test);
