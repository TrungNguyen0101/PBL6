const express = require("express");
const router = express.Router();
const { comme, commentController } = require("../controllers/index.js");
const middleware = require("../utils/middleware.js");

// router.post("/:id_book/comments/create", middleware.authMiddleWare, commentController.handleCreateComment);
router.get('/:id_book/comments', commentController.list)
router.post('/:id_book/comments/create', middleware.authMiddleWare, commentController.create)
// router.put('/comments/:comment_id/update', middleware.authMiddleWare, commentController.update)
// router.delete('/comments/:comment_id/delete', middleware.authMiddleWare, commentController.delete)
module.exports = router;
