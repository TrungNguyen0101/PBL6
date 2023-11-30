const express = require("express");
const router = express.Router();
const { orderController } = require("../controllers/index.js");
const middleware = require("../utils/middleware.js");

router.get("/", middleware.authMiddleWare, orderController.getOrderByIdAccount);
// router.patch("/update", categoryController.handleUpdateCategory);
router.delete("/:id", orderController.deleteOrder);
router.post("/insert", middleware.authMiddleWare, orderController.insertOrder);

module.exports = router;
