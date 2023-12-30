const db = require("../models/index.js");

const insertOrder = async (data) => {
  let orderData = {};
  try {
    const order = await db.Order.findOne({
      IdAccount: data?.IdAccount,
      "Book._id": data?.Book._id,
      isPayment: false,
    });
    if (!order) {
      console.log(1);
      const order = await db.Order.create(data);
      orderData.order = order;
      orderData.errCode = 200;
      orderData.errMessage = "Create order succeed";
    } else {
      console.log(2);
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
const updateOrder = async (data) => {
  let orderData = {};
  try {
    const order = await db.Order.findOne({
      IdAccount: data?.IdAccount,
      "Book._id": data?.BookId,
      isPayment: false,
    });
    if (order) {
      if (data.status === undefined) {
        const result = await order.updateOne({
          Count: data.Count,
        });
        orderData.order = result;
        orderData.errCode = 200;
      } else {
        const result = await order.updateOne({
          status: data.status,
        });
        orderData.order = result;
        orderData.errCode = 200;
      }
    }
  } catch (e) {
    console.log("file: orderService.js:13 ~ insertOrder ~ e:", e);
    orderData.errCode = 500;
    orderData.errMessage = "Create order failed";
  }
  return orderData;
};
const updateAllStatusOrder = async (data) => {
  let orderData = {};
  try {
    const orders = await db.Order.updateMany(
      {
        IdAccount: data?.IdAccount,
        isPayment: false,
      },
      { $set: { status: data.status } }
    );
  } catch (e) {
    console.log("file: orderService.js:13 ~ insertOrder ~ e:", e);
    orderData.errCode = 500;
    orderData.errMessage = "Create order failed";
  }
  return orderData;
};

const updatePaymentOrder = async (data) => {
  let orderData = {};
  try {
    const order = await db.Order.findOne({
      IdAccount: data?.IdAccount,
      "Book._id": data?.BookId,
      isPayment: false,
    });
    if (order) {
      const result = await order.updateOne({
        isPayment: true,
      });
      console.log(result);
    }
    orderData.errCode = 200;
    orderData.errMessage = "Create order success";
  } catch (e) {
    console.log(e);
  }
};
const updateStatusPaymentOrder = async (data) => {
  let orderData = {};
  try {
    const order = await db.Order.findOne({
      _id: data?.id,
    });
    if (order) {
      const result = await order.updateOne({
        isPayment: true,
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

const getOrderById = async (bookId) => {
  let orderData = {};
  try {
    const order = await db.Order.find({ _id: bookId.id });
    orderData.order = order;
    orderData.errCode = 0;
    orderData.errMessage = "Get all order succeed";
  } catch (e) {
    orderData.errCode = 2;
    orderData.errMessage = "Get all order failed";
  }
  return orderData;
};
const getOrderByAcountStatus = async (ID_Account) => {
  let orderData = {};
  try {
    const order = await db.Order.find({
      IdAccount: ID_Account.id,
      status: true,
      isPayment: false,
    });
    orderData.order = order;
    orderData.errCode = 0;
    orderData.errMessage = "Get all order succeed";
  } catch (e) {
    orderData.errCode = 2;
    orderData.errMessage = "Get all order failed";
  }
  return orderData;
};

const getOrderByIdAccount = async (ID_Account) => {
  let orderData = {};
  try {
    const order = await db.Order.find({
      IdAccount: ID_Account.id,
      isPayment: false,
    });
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
    const result = await db.Order.deleteOne({
      _id: id.id,
    });
    orderData.data = result;
    orderData.errCode = 0;
    orderData.errMessage = "delete order succeed";
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
  getOrderById: getOrderById,
  updateAllStatusOrder: updateAllStatusOrder,
  getOrderByAcountStatus: getOrderByAcountStatus,
  updatePaymentOrder: updatePaymentOrder,
  updateStatusPaymentOrder: updateStatusPaymentOrder,
};
