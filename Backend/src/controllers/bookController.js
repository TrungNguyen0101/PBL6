// const BookModal = require("../models/book")
// const mongoose = require('mongoose')

const { bookService } = require("../services")
const bookController = require("./bookController")

// class bookController {
//     async getAll(req, res) {
//         try {
//             const newBook = new BookModal({
//                 Name_Category: 'kinh di',
//                 Name: 'The nun 2',
//                 Price: 200000,
//                 Author: 'ABC',
//                 Desc: 'So vl'
//             })
//             newBook.save()
//             const AllBook = await BookModal.find()
//             return res.json(AllBook)
//         } catch (error) {
//             console.error('Error creating hire', error);
//             res.status(500).json({ error: 'Failed to create hire' });
//         }
//     }
// }

// module.exports = new bookController;

async function getAllBooks(req,res) {

}
async function getBookById(req,res) {

}
async function updateBook(req,res) {

}
async function insertBook(req,res) {
    try {
        const book = await bookService.insertBook(req.body);
        console.log(book)
        res.status(200).json({
            message: "insert succeed",
            data : book
        })
    } catch (error) {
        res.status(500).json({
            message:"failed"
        })
    }
}

module.exports = {
    getAllBooks:getAllBooks,
    getBookById:getBookById,
    updateBook:updateBook,
    insertBook:insertBook
}