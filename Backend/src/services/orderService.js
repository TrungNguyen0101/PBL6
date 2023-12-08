const db = require("../models/index.js");

const insertOrder = async (data) => {
  let orderData = {};
  try {
    const order = await db.Order.findOne({
      IdAccount: data?.IdAccount,
      "Book._id": data?.Book._id,
    });
    if (!order) {
      const order = await db.Order.create(data);
      console.log("add");
      orderData.order = order;
      orderData.errCode = 200;
      orderData.errMessage = "Create order succeed";
    } else {
      console.log("update");
      const countUpdate = parseInt(order?.Count) + parseInt(data?.Count);
      const result = await order.updateOne({
        Count: countUpdate,
      });
      orderData.order = result;
      orderData.errCode = 200;
    }
  } catch (e) {
    console.log("file: orderService.js:13 ~ insertOrder ~ e:", e);
    orderData.errCode = 500;
    orderData.errMessage = "Create order failed";
  }
  return orderData;
};
const updateOrder = async () => {};
const getOrderByIdAccount = async (ID_Account) => {
  let orderData = {};
  try {
    const order = await db.Order.find({ IdAccount: ID_Account.id });
    orderData.order = order;
    orderData.errCode = 0;
    orderData.errMessage = "Get all order succeed";
  } catch (e) {
    orderData.errCode = 2;
    orderData.errMessage = "Get all order failed";
  }
  return orderData;
};

const deleteOrder = async (id) => {
  let orderData = {};
  try {
    const order = await db.Order.findOne({ _id: id.id });
    if (order._id === id) {
      await db.Order.deleteOne({
        _id: id.id,
      });
      orderData.errCode = 0;
      orderData.errMessage = "delete order succeed";
    } else {
      orderData.errCode = 0;
      orderData.errMessage = "delete order failed";
    }
  } catch (e) {
    orderData.errCode = 2;
    orderData.errMessage = "delete order failed";
  }
  return orderData;
};
module.exports = {
  insertOrder: insertOrder,
  updateOrder: updateOrder,
  getOrderByIdAccount: getOrderByIdAccount,
  deleteOrder: deleteOrder,
};
