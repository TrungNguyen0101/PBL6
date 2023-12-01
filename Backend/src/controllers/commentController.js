const BookComment = require("../models/Comment.js")
const Book = require("../models/Book.js");
const mongoose = require('mongoose');
const { Validator } = require('node-input-validator');
const list = async (req, res) => {
    try {
        const id_book = req.params.id_book;
        if (!id_book || !mongoose.Types.ObjectId.isValid(id_book)) {
            return res.status(400).send({ message: 'Invalid book id', data: {} });
        }

        const book = await Book.findOne({ _id: id_book });
        if (!book) {
            return res.status(400).send({ message: 'No book found', data: {} });
        }

        const query = [
            {
                $lookup: {
                    from: "users",
                    localField: "id_user",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: '$user' },
            {
                $match: {
                    'id_book': new mongoose.Types.ObjectId(id_book)
                }
            },
            { $sort: { createdAt: -1 } }
        ];

        const total = await BookComment.countDocuments(query);
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const skip = (page - 1) * perPage;

        query.push({ $skip: skip });
        query.push({ $limit: perPage });

        const comments = await BookComment.aggregate(query);

        return res.send({
            message: 'Comment successfully fetched',
            data: {
                comments,
                meta: {
                    total,
                    currentPage: page,
                    perPage,
                    totalPages: Math.ceil(total / perPage)
                }
            }
        });
    } catch (err) {
        return res.status(400).send({ message: err.message, data: err });
    }
};
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
        const newComment = new BookComment({
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
const update = async (req, res) => {
    try {
        const id_comment = req.params.id_comment;
        if (!mongoose.Types.ObjectId.isValid(id_comment)) {
            return res.status(400).send({ message: 'Invalid comment id', data: {} });
        }
        const comment = await BookComment.findOne({ _id: id_comment });
        if (!comment) {
            return res.status(400).send({ message: 'No comment found', data: {} });
        }

        const current_user = req.User.User;
        if (comment.id_user.toString() !== current_user._id) {
            return res.status(400).send({ message: 'Access denied', data: {} });
        }
        await BookComment.updateOne({ _id: id_comment }, { comment: req.body.comment });

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
            { $match: { '_id': new mongoose.Types.ObjectId(id_comment) } },
        ]);
        return res.status(200).send({
            message: 'Comment successfully updated',
            data: comments[0]
        });
    } catch (err) {
        return res.status(400).send({ message: err.message, data: err });
    }
};
const deleteComment = async (req, res) => {
    try {
        const id_comment = req.params.id_comment;
        if (!mongoose.Types.ObjectId.isValid(id_comment)) {
            return res.status(400).send({ message: 'Invalid comment id', data: {} });
        }
        const comment = await BookComment.findOne({ _id: id_comment });
        if (!comment) {
            return res.status(400).send({ message: 'No comment found', data: {} });
        }
        const current_user = req.User.User;
        if (comment.id_user.toString() !== current_user._id) {
            return res.status(400).send({ message: 'Access denied', data: {} });
        }
        await BookComment.deleteOne({ _id: id_comment });
        await Book.updateOne(
            { _id: comment.id_book },
            { $pull: { Book_comments: id_comment } }
        );
        return res.status(200).send({ message: 'Comment successfully deleted', data: {} });
    } catch (err) {
        return res.status(400).send({ message: err.message, data: err });
    }
};
module.exports = {
    create, list, update, deleteComment
};
