const express = require("express");
const router = express.Router();
const { historyController } = require("../controllers/index.js");
const middleware = require("../utils/middleware.js");

router.post('/:id_book/history', middleware.authMiddleWare, historyController.create)

module.exports = router;
