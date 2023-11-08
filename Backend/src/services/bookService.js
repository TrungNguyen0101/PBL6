const bookService = require("../controllers/index.js");
const Book = require("../models/Book.js");
const db = require("../models/index.js");

const insertBook = async (data) => {
  let bookData = {};
  try {
    await db.Book.create(data);
    bookData.errCode = 0;
    bookData.errMessage = "Create book succeed";
  } catch (e) {
    bookData.errCode = 2;
    bookData.errMessage = "Create book failed";
  }
  return bookData;
};
const updateBook = async () => {};
const getAllBooks = async () => {
  let bookData = {};
  try {
    const book = await db.Book.find();
    bookData.books = book;
    bookData.errCode = 0;
    bookData.errMessage = "Get all book succeed";
  } catch (e) {
    bookData.errCode = 2;
    bookData.errMessage = "Get all book failed";
  }
  return bookData;
};
const getBookById = async (id) => {
  let bookData = {};
  try {
    const book = await db.Book.findOne({ _id: id.id });
    bookData.book = book;
    bookData.errCode = 0;
    bookData.errMessage = "Get all book succeed";
  } catch (e) {
    bookData.errCode = 2;
    bookData.errMessage = "Get all book failed";
  }
  return bookData;
};
module.exports = {
  insertBook: insertBook,
  updateBook: updateBook,
  getAllBooks: getAllBooks,
  getBookById: getBookById,
};
