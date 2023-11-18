const { categoryService } = require("../services");
const categoryController = require("./categoryController");

async function getAllCategory(req, res) {
  try {
    const category = await categoryService.getAllCategory();
    res.status(200).json({
      message: "get all succeed",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
}
// async function getBookById(req, res) {
//   try {
//     const book = await bookService.getBookById(req.params);
//     res.status(200).json({
//       message: "get book by id succeed",
//       data: book,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "failed",
//     });
//   }
// }
// async function updateBook(req, res) {}
async function insertCategory(req, res) {
  try {
    const category = await categoryService.insertCategory(req.body);
    res.status(200).json({
      message: "insert succeed",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
}

module.exports = {
  getAllCategory: getAllCategory,
  // getCategoryById: getCategoryById,
  //   updateBook: updateBook,
  insertCategory: insertCategory,
};
