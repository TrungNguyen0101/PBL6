const express = require("express");
const router = express.Router();
const { orderController } = require("../controllers/index.js");
const middleware = require("../utils/middleware.js");

router.get("/", middleware.authMiddleWare, orderController.getOrderByIdAccount);
router.get("/:id", middleware.authMiddleWare, orderController.getOrderById);
router.put("/update", middleware.authMiddleWare, orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);
router.post("/insert", middleware.authMiddleWare, orderController.insertOrder);

module.exports = router;
