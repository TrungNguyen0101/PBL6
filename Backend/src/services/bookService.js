const bookService = require('../controllers/index.js')
const Book = require('../models/Book.js');

const insertBook = async(user,data) => {
    console.log("insert book")
}
const updateBook = async()=> {
    
}
const getAllBooks = async()=> {
    
}
const getBookById = async()=> {
    
}
module.exports = {
    insertBook:insertBook,
    updateBook:updateBook,
    getAllBooks:getAllBooks,
    getBookById : getBookById
}