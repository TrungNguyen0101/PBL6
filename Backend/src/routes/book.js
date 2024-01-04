const express = require("express");
const router = express.Router();
const { bookController } = require("../controllers/index.js");
const middleware = require("../utils/middleware.js");

router.get("/", bookController.getAllBooks);
router.get("/book-by-discount", bookController.getAllBooksByDiscount);
router.delete("/:id", bookController.deleteBook);
router.get("/book-by-category", bookController.getBookByCategory);
router.get("/:id", bookController.getBookById);
router.post("/insert", bookController.insertBook);
router.put("/", bookController.updateBook);
router.post("/search", bookController.handleSearchBook);
router.post("/search-page", bookController.handleSearchPageBook);
module.exports = router;
