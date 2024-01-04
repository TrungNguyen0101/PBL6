const { data } = require("jquery");
const { bookService } = require("../services");
const bookController = require("./bookController");

async function getAllBooks(req, res) {
  try {
    let body = req.query;
    const book = await bookService.getAllBooks(body);
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
async function getAllBooksByDiscount(req, res) {
  try {
    // let body = req.query;
    const book = await bookService.getAllBooksByDiscount();
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
async function deleteBook(req, res) {
  try {
    const book = await bookService.deleteBook(req.params);
    res.status(200).json({
      message: "delete succeed",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
}
async function getBookByCategory(req, res) {
  try {
    const book = await bookService.getBookByCategory(req.query);
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
async function updateBook(req, res) {
  try {
    const book = await bookService.updateBook(req.body);
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
async function handleSearchBook(req, res) {
  try {
    let query = req.query.title;
    if (!query) {
      return res.status(500).json({
        status: 500,
        message: "Missing inputs parameter",
      })
    }
    const book = await bookService.searchBook(query);
    if (book.status === 200) {
      res.status(200).json({
        message: "Search succeed",
        data: book.data,
      });
    }
    else {
      res.status(500).json({
        message: "Search Failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
}
async function handleSearchPageBook(req, res) {
  try {
    let query = req.query;
    if (!query) {
      return res.status(500).json({
        status: 500,
        message: "Missing inputs parameter",
      })
    }
    const book = await bookService.searchPageBook(query);
    if (book.status === 200) {
      res.status(200).json({
        message: "Search succeed",
        result: book,
      });
    }
    else {
      res.status(500).json({
        message: "Search Failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
}
module.exports = {
  getAllBooks: getAllBooks,
  getBookById: getBookById,
  deleteBook: deleteBook,
  getBookByCategory: getBookByCategory,
  getAllBooksByDiscount: getAllBooksByDiscount,
  updateBook: updateBook,
  insertBook: insertBook,
  handleSearchBook: handleSearchBook,
  handleSearchPageBook: handleSearchPageBook
};
