const { bookService } = require("../services")
const bookController = require("./bookController")

async function getAllBooks(req, res) {

}
async function getBookById(req, res) {

}
async function updateBook(req, res) {

}
async function insertBook(req, res) {
    try {
        const book = await bookService.insertBook(req.body);
        console.log(book)
        res.status(200).json({
            message: "insert succeed",
            data: book
        })
    } catch (error) {
        res.status(500).json({
            message: "failed"
        })
    }
}

module.exports = {
    getAllBooks: getAllBooks,
    getBookById: getBookById,
    updateBook: updateBook,
    insertBook: insertBook
}