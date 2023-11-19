const Book = require("../models/Book.js");
const db = require("../models/index.js");

const insertBook = async (data) => {
  console.log("file: bookService.js:5 ~ insertBook ~ data:", data);
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
const updateBook = async (data) => {
  let bookData = {};
  try {
    // const bookById = await db.Book.findOne({ _id: data.id });
    const result = await Book.updateOne(
      { _id: data.id },
      {
        booktitle: data.booktitle,
        author: data.author,
        price: data.price,
        quantity: data.quantity,
        datePicker: data.datePicker,
        desc: data.desc,
        category: data.category,
        mainImage: data.mainImage,
        publisher: data.publisher,
        infomation: data.infomation,
        language: data.language,
        discount: data.discount,
        // status: data.status,
      }
    );
    bookData.book = result;
    bookData.errCode = 0;
    bookData.errMessage = "update book succeed";
  } catch (e) {
    bookData.errCode = 2;
    bookData.errMessage = "update book failed";
  }
  return bookData;
};
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
const getBookByCategory = async (category) => {
  let bookData = {};
  try {
    const book = await db.Book.find({ category: category.value });
    bookData.book = book;
    bookData.errCode = 0;
    bookData.errMessage = "Get book by category succeed";
  } catch (e) {
    bookData.errCode = 2;
    bookData.errMessage = "Get book category failed";
  }
  return bookData;
};
module.exports = {
  insertBook: insertBook,
  updateBook: updateBook,
  getAllBooks: getAllBooks,
  getBookById: getBookById,
  getBookByCategory: getBookByCategory,
};
