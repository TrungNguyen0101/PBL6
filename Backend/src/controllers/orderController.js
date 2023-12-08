const { orderService } = require("../services");

async function getOrderByIdAccount(req, res) {
  try {
    const order = await orderService.getOrderByIdAccount(req.query);
    res.status(200).json({
      message: "get all succeed",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
}

async function insertOrder(req, res) {
  try {
    const order = await orderService.insertOrder(req.body);
    res.status(200).json({
      message: "insert succeed",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
}
async function updateOrder(req, res) {
  try {
    const order = await orderService.updateOrder(req.body);
    res.status(200).json({
      message: "insert succeed",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
}

async function getOrderById(req, res) {
  try {
    const order = await orderService.getOrderById(req.params);
    res.status(200).json({
      message: "get order by id succeed",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
}

async function deleteOrder(req, res) {
  try {
    const order = await orderService.deleteOrder(req.params);
    res.status(200).json({
      message: "delete succeed",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      message: "failed",
    });
  }
}

module.exports = {
  insertOrder: insertOrder,
  updateOrder: updateOrder,
  getOrderByIdAccount: getOrderByIdAccount,
  deleteOrder: deleteOrder,
  getOrderById: getOrderById,
};
