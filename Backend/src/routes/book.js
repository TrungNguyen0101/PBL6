// const express = require('express')
// var router = express.Router()

// const bookController = require('../controllers/bookController');

// router.get('/getAll', bookController.getAll)

// module.exports = router;
const express = require("express")
const router = express.Router();
const {
        userController,
        bookController
} = require('../controllers/index.js')
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/insert", bookController.insertBook);
        //put or patch
router.patch('/',bookController.updateBook)
module.exports = router;