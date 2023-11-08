const express = require("express");
const router = express.Router();
const { bookController } = require("../controllers/index.js");
const middleware = require("../utils/middleware.js");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/insert", bookController.insertBook);
router.patch("/", bookController.updateBook);
module.exports = router;
