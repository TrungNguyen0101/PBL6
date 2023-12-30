const express = require("express");
const router = express.Router();
const { orderController } = require("../controllers/index.js");
const middleware = require("../utils/middleware.js");

router.get("/", middleware.authMiddleWare, orderController.getOrderByIdAccount);
router.get(
  "/order-status",
  middleware.authMiddleWare,
  orderController.getOrderByAcountStatus
);
router.get("/:id", middleware.authMiddleWare, orderController.getOrderById);
router.put("/update", middleware.authMiddleWare, orderController.updateOrder);
router.put(
  "/update-status",
  middleware.authMiddleWare,
  orderController.updateAllStatusOrder
);
router.put(
  "/update-payment",
  middleware.authMiddleWare,
  orderController.updatePaymentOrder
);
router.put(
  "/update-status-payment",
  middleware.authMiddleWare,
  orderController.updateStatusPaymentOrder
);
router.delete("/:id", orderController.deleteOrder);
router.post("/insert", middleware.authMiddleWare, orderController.insertOrder);

module.exports = router;
