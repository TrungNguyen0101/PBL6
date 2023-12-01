const express = require("express");
const router = express.Router();
const { comme, commentController } = require("../controllers/index.js");
const middleware = require("../utils/middleware.js");

router.get('/:id_book/comments', commentController.list)
router.post('/:id_book/comments/create', middleware.authMiddleWare, commentController.create)
router.put('/comments/:id_comment/update', middleware.authMiddleWare, commentController.update)
router.delete('/comments/:id_comment/delete', middleware.authMiddleWare, commentController.deleteComment)
module.exports = router;
