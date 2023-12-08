const {
    historyService
} = require("../services/index.js")
const History = require("../models/History.js")
const Book = require("../models/Book.js");
const mongoose = require('mongoose');
const { Validator } = require('node-input-validator');

const create = async (req, res) => {
    try {
        const id_book = req.params.id_book;
        if (!id_book) {
            return res.status(400).send({ message: 'Invalid book id', data: {} });
        }
        const book = await Book.findOne({ _id: id_book });
        if (!book) {
            return res.status(400).send({ message: 'No book found', data: {} });
        }
        // Check enter comment
        const v = new Validator(req.body, { comment: 'required' });
        const isValid = await v.check();
        if (!isValid) {
            return res.status(422).send(v.errors);
        }
        const newHistory = new History({

            comment: req.body.comment,
            id_book: id_book,
            id_user: req.User.User._id
        });
        const commentData = await newComment.save();

        if (mongoose.Types.ObjectId.isValid(commentData._id)) {
            await Book.updateOne(
                { _id: id_book },
                { $push: { comment: new mongoose.Types.ObjectId(commentData._id) } }
            );
        }
        const comments = await BookComment.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "id_user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: '$user' },
            { $match: { '_id': new mongoose.Types.ObjectId(commentData._id) } },
        ]);
        return res.status(200).send({
            message: 'Comment successfully added',
            data: comments[0]
        });
    } catch (err) {
        return res.status(400).send({ message: err.message, data: err });
    }
};
module.exports = {
    create
};
