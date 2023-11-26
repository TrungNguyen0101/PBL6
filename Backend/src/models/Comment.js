const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const CommentSchema = new Schema({
    id_book: { type: Schema.Types.ObjectId, required: true },
    id_user: { type: Schema.Types.ObjectId, required: true },
    comment: { type: String, required: true },
}, { timestamps: true });

module.exports = model('Comment', CommentSchema);
