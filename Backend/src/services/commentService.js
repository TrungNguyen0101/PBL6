const db = require("../models/index.js");
const bookService = require("./bookService.js")
const createComment = async (id_user, id_book, comment) => {
    const commentData = {};
    try {
        let comments = await db.Comment.create({
            id_user: id_user,
            id_book: id_book,
            comment: comment,
        })
        commentData.comment = comments
        commentData.status = 200;
        commentData.message = "Create comment successfully!";
        return commentData
    } catch (e) {
        commentData.status = 500;
        commentData.message = "Create comment failed!";
    }
    return commentData
}
module.exports = {
    createComment
}