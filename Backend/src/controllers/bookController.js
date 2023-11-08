const { bookService } = require("../services");
const bookController = require("./bookController");

async function getAllBooks(req, res) {
  try {
    const book = await bookService.getAllBooks();
    res.status(200).json({
      message: "get all succeed",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
}
async function getBookById(req, res) {
  try {
    const book = await bookService.getBookById(req.params);
    res.status(200).json({
      message: "get book by id succeed",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
}
async function updateBook(req, res) {}
async function insertBook(req, res) {
  try {
    const book = await bookService.insertBook(req.body);
    res.status(200).json({
      message: "insert succeed",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
}

module.exports = {
  getAllBooks: getAllBooks,
  getBookById: getBookById,
  updateBook: updateBook,
  insertBook: insertBook,
};
