const express = require("express");
const router = express.Router();
const { orderController } = require("../controllers/index.js");

router.get("/", orderController.getOrderByIdAccount);
// router.patch("/update", categoryController.handleUpdateCategory);
router.delete("/:id", orderController.deleteOrder);
router.post("/insert", orderController.insertCategory);

module.exports = router;
