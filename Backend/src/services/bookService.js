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
const deleteBook = async (id) => {
  let bookData = {};
  try {
    await db.Book.deleteOne({
      _id: id.id,
    });
    bookData.errCode = 0;
    bookData.errMessage = "delete book succeed";
  } catch (e) {
    bookData.errCode = 2;
    bookData.errMessage = "delete book failed";
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
        descImage: data.descImage,
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
const getAllBooks = async (body) => {
  try {
    let bookData = {};
    const { page, limit } = body;
    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 10;
    const skip = (parsedPage - 1) * parsedLimit;
    const totalCount = await Book.countDocuments({});
    const totalPages = Math.ceil(totalCount / parsedLimit);

    const books = await Book.find({}).skip(skip).limit(parsedLimit);

    return (bookData = {
      page: parsedPage,
      limit: parsedLimit,
      totalPages,
      totalCount,
      books,
    });
  } catch (error) {
    console.error("Error retrieving reviews", error);
    res.status(500).json({ error: "Server error" });
  }
};
const getAllBooksByDiscount = async (body) => {
  try {
    let bookData = {};
    const parsedPage = 1;
    const parsedLimit = 6;
    const skip = (parsedPage - 1) * parsedLimit;
    const totalCount = await Book.countDocuments({});
    const totalPages = Math.ceil(totalCount / parsedLimit);

    const books = await Book.find({ discount: { $ne: 0 } })
      .skip(skip)
      .limit(parsedLimit);

    return (bookData = {
      page: parsedPage,
      limit: parsedLimit,
      totalPages,
      totalCount,
      books,
    });
  } catch (error) {
    console.error("Error retrieving reviews", error);
    res.status(500).json({ error: "Server error" });
  }
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
  deleteBook: deleteBook,
  getAllBooks: getAllBooks,
  getBookById: getBookById,
  getBookByCategory: getBookByCategory,
  getAllBooksByDiscount: getAllBooksByDiscount,
};
