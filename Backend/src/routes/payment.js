const express = require("express");
const router = express.Router();
let $ = require('jquery');
const request = require('request');
const moment = require('moment');
const db = require("../models/index")
const { ObjectId } = require('mongodb');
const middleware = require("../utils/middleware.js");
const { paymentController } = require("../controllers/index.js");
router.post('/create_payment_url', middleware.authMiddleWare, paymentController.handleCreate_payment_url);
router.post("/payment_direct", middleware.authMiddleWare, paymentController.handlePaymentDirect);
router.get("/payment_history", middleware.authMiddleWare, paymentController.handlePaymentHistory);
router.get("/payment_history_succeed", paymentController.handlePaymentHistorySucceed);
router.get("/payment_online", paymentController.handlePaymentOnline);
router.get("/getAllPayment", async function (req, res, next) {
    const payments = await db.Payment.find({});
    return res.send({
        data: payments
    })
})
router.post("/update_state", async function (req, res, next) {
    let orderId = req.body.orderId;
    let status = req.body.status;
    const data = await db.Payment.findOne({ orderId: orderId }).exec();
    if (!data) {
        return res.status(404).send({
            error: 'Document not found',
        });
    }
    await db.Payment.updateOne(
        { orderId: orderId },
        {
            $set: { status: status }
        }
    );
    const updatedData = await db.Payment.findOne({ orderId: orderId }).exec();
    if (updatedData.status === 2) {
        for (let i = 0; i < updatedData.cart.length; i++) {
            const itemId = updatedData.cart[i]._id;
            const existingBook = await db.Book.findById(itemId);
            const newQuantity = parseInt(existingBook.quantity) - parseInt(updatedData.cart[i].Count);
            await db.Book.updateOne(
                { _id: new ObjectId(itemId) },
                { $set: { quantity: newQuantity } }
            );
        }
    }
    if (updatedData.status === 4) {
        for (let i = 0; i < updatedData.cart.length; i++) {
            const itemId = updatedData.cart[i]._id;
            const existingBook = await db.Book.findById(itemId);
            const newQuantity = parseInt(existingBook.quantity) + parseInt(updatedData.cart[i].Count);
            await db.Book.updateOne(
                { _id: new ObjectId(itemId) },
                { $set: { quantity: newQuantity } }
            );
        }
    }
    return res.send({
        data: updatedData
    });
})
router.get("/:id", paymentController.handleGetDetailPaymentByID);
module.exports = router;

