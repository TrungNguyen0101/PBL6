const BookComment = require("../models/Comment.js")
const Book = require("../models/Book.js");
const mongoose = require('mongoose');
const { Validator } = require('node-input-validator');
const list = (req, res) => {
    let id_book = req.params.id_book;
    if (!id_book) {
        return res.status(400).send({
            message: 'Invalid book id',
            data: {}
        });
    }

    Book.findOne({ _id: id_book }).then(async (Book) => {
        if (!Book) {
            return res.status(400).send({
                message: 'No Book found',
                data: {}
            });
        } else {

            try {
                let query = [
                    {
                        $lookup:
                        {
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
                    {
                        $sort: {
                            createdAt: -1
                        }
                    }
                ];

                let total = await BookComment.countDocuments(query);
                let page = (req.query.page) ? parseInt(req.query.page) : 1;
                let perPage = (req.query.perPage) ? parseInt(req.query.perPage) : 10;
                let skip = (page - 1) * perPage;
                query.push({
                    $skip: skip,
                });
                query.push({
                    $limit: perPage,
                });

                let comments = await BookComment.aggregate(query);
                return res.send({
                    message: 'Comment successfully fetched',
                    data: {
                        comments: comments,
                        meta: {
                            total: total,
                            currentPage: page,
                            perPage: perPage,
                            totalPages: Math.ceil(total / perPage)
                        }
                    }
                });

            } catch (err) {
                return res.status(400).send({
                    message: err.message,
                    data: err
                });
            }



        }
    }).catch((err) => {
        return res.status(400).send({
            message: err.message,
            data: err
        });
    })



}
const create = async (req, res) => {
    let id_book = req.params.id_book;
    if (!id_book) {
        return res.status(400).send({
            message: 'Invalid book id',
            data: {}
        });
    }
    Book.findOne({ _id: id_book }).then(async (book) => {
        if (!book) {
            return res.status(400).send({
                message: 'No book found',
                data: {}
            });
        } else {
            try {
                const v = new Validator(req.body, {
                    comment: 'required',
                });
                const matched = await v.check();
                if (!matched) {
                    return res.status(422).send(v.errors);
                }
                let newCommentDocument = new BookComment({
                    comment: req.body.comment,
                    id_book: id_book,
                    id_user: req.User.User._id
                });
                let commentData = await newCommentDocument.save();
                console.log(commentData)
                const validObjectId = mongoose.Types.ObjectId.isValid(commentData._id);
                if (validObjectId) {
                    await Book.updateOne(
                        { _id: id_book },
                        {
                            $push: { comment: new mongoose.Types.ObjectId(commentData._id) }
                        }
                    )
                }
                let query = [
                    {
                        $lookup:
                        {
                            from: "users",
                            localField: "id_user",
                            foreignField: "_id",
                            as: "user"
                        }
                    },
                    { $unwind: '$user' },
                    {
                        $match: {
                            '_id': new mongoose.Types.ObjectId(commentData._id)
                        }
                    },

                ];
                let comments = await BookComment.aggregate(query);
                return res.status(200).send({
                    message: 'Comment successfully added',
                    data: comments[0]
                });
            } catch (err) {
                return res.status(400).send({
                    message: err.message,
                    data: err
                });
            }
        }
    }).catch((err) => {
        return res.status(400).send({
            message: err.message,
            data: err
        });
    })
}

// exports.update = async (req, res) => {
//     let comment_id = req.params.comment_id;
//     if (!mongoose.Types.ObjectId.isValid(comment_id)) {
//         return res.status(400).send({
//             message: 'Invalid comment id',
//             data: {}
//         });
//     }

//     BookComment.findOne({ _id: comment_id }).then(async (comment) => {
//         if (!comment) {
//             return res.status(400).send({
//                 message: 'No comment found',
//                 data: {}
//             });
//         } else {

//             let current_user = req.user;

//             if (comment.id_user != current_user._id) {
//                 return res.status(400).send({
//                     message: 'Access denied',
//                     data: {}
//                 });
//             } else {

//                 try {
//                     const v = new Validator(req.body, {
//                         comment: 'required',
//                     });
//                     const matched = await v.check();
//                     if (!matched) {
//                         return res.status(422).send(v.errors);
//                     }

//                     await BookComment.updateOne({ _id: comment_id }, {
//                         comment: req.body.comment
//                     });


//                     let query = [
//                         {
//                             $lookup:
//                             {
//                                 from: "users",
//                                 localField: "id_user",
//                                 foreignField: "_id",
//                                 as: "user"
//                             }
//                         },
//                         { $unwind: '$user' },
//                         {
//                             $match: {
//                                 '_id': mongoose.Types.ObjectId(comment_id)
//                             }
//                         },

//                     ];

//                     let comments = await BookComment.aggregate(query);

//                     return res.status(200).send({
//                         message: 'Comment successfully updated',
//                         data: comments[0]
//                     });


//                 } catch (err) {
//                     return res.status(400).send({
//                         message: err.message,
//                         data: err
//                     });
//                 }


//             }




//         }
//     }).catch((err) => {
//         return res.status(400).send({
//             message: err.message,
//             data: err
//         });
//     })



// }

// exports.delete = (req, res) => {
//     let comment_id = req.params.comment_id;
//     if (!mongoose.Types.ObjectId.isValid(comment_id)) {
//         return res.status(400).send({
//             message: 'Invalid comment id',
//             data: {}
//         });
//     }

//     BookComment.findOne({ _id: comment_id }).then(async (comment) => {
//         if (!comment) {
//             return res.status(400).send({
//                 message: 'No comment found',
//                 data: {}
//             });
//         } else {

//             let current_user = req.user;

//             if (comment.id_user != current_user._id) {
//                 return res.status(400).send({
//                     message: 'Access denied',
//                     data: {}
//                 });
//             } else {
//                 try {
//                     await BookComment.deleteOne({ _id: comment_id })
//                     await Book.updateOne(
//                         { _id: comment.id_book },
//                         {
//                             $pull: { Book_comments: comment_id }
//                         }
//                     )

//                     return res.status(200).send({
//                         message: 'Comment successfully deleted',
//                         data: {}
//                     });
//                 } catch (err) {
//                     return res.status(400).send({
//                         message: err.message,
//                         data: err
//                     });
//                 }



//             }

//         }
//     }).catch((err) => {
//         return res.status(400).send({
//             message: err.message,
//             data: err
//         });
//     })


// }
module.exports = {
    create, list
};
