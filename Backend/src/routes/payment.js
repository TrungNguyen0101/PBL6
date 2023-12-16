const express = require("express");
const router = express.Router();
let $ = require('jquery');
const request = require('request');
const moment = require('moment');
const vnpayConfig = require('../config/vnpay')
const db = require("../models/index")
const middleware = require("../utils/middleware.js");
const { paymentController } = require("../controllers/index.js");
var cartManage;
var userManage;
var phoneManage;
var addressManage;
var clientIPAddress;
function getDataPayment(cart, user, phone, address) {
    cartManage = cart;
    userManage = user;
    phoneManage = phone;
    addressManage = address;
}
router.post('/create_payment_url', middleware.authMiddleWare, function (req, res, next) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    let tmnCode = vnpayConfig.vnp_TmnCode;
    let secretKey = vnpayConfig.vnp_HashSecret;
    let vnpUrl = vnpayConfig.vnp_Url;
    let returnUrl = vnpayConfig.vnp_ReturnUrl;
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    let bankCode = req.body.bankCode;
    let cart = req.body.cart;
    let user = req.User.User;
    let phone = req.body.phone;
    let address = req.body.address;
    let locale = req.body.language;
    if (locale === null || locale === '') {
        locale = 'vn';
    }
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }
    getDataPayment(cart, user, phone, address)
    vnp_Params = sortObject(vnp_Params);
    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    return res.status(200).send({
        message: 'Successfully',
        data: vnpUrl
    });
});
router.get('/vnpay_return', async function (req, res) {
    try {
        const vnp_Params = req.query;
        const secureHash = vnp_Params['vnp_SecureHash'];

        // Remove unnecessary parameters for hash calculation
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];

        // Sort the remaining parameters for hash calculation
        const sortedParams = sortObject(vnp_Params);

        const tmnCode = vnpayConfig.vnp_TmnCode;
        const secretKey = vnpayConfig.vnp_HashSecret;

        // Generate the hash
        let querystring = require('qs');
        let signData = querystring.stringify(sortedParams, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        if (secureHash === signed) {
            return res.json({ code: sortedParams['vnp_ResponseCode'], message: 'Success' });
        } else {
            return res.json({ code: '97', message: 'Checksum failed' });
        }
    } catch (error) {
        console.error('Error processing VNPAY return:', error);
        return res.json({ code: '99', message: 'Internal Server Error' });
    }
});
router.get('/vnpay_ipn', async function (req, res, next) {
    try {
        const vnp_Params = req.query;
        const secureHash = vnp_Params['vnp_SecureHash'];

        const orderId = vnp_Params['vnp_TxnRef'];
        const rspCode = vnp_Params['vnp_ResponseCode'];

        // Remove unnecessary parameters for hash calculation
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
        // Sort the remaining parameters for hash calculation
        const sortedParams = sortObject(vnp_Params);
        const secretKey = vnpayConfig.vnp_HashSecret;
        let querystring = require('qs');
        let signData = querystring.stringify(sortedParams, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

        // Assume paymentStatus is retrieved from your database or another source
        let paymentStatus = '0'; // Default to '0' if not available
        let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
        let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn

        if (secureHash === signed) {
            // Perform additional checks if needed (e.g., checkOrderId, checkAmount)
            if (checkOrderId) {
                if (checkAmount) {
                    if (paymentStatus === '0') {
                        if (rspCode === '00') {
                            // Payment successful
                            await handleSuccessfulPayment(orderId, sortedParams);
                            res.status(200).json({ RspCode: '00', Message: 'Success' });
                        } else {
                            // Payment failed
                            await handleFailedPayment(orderId, sortedParams);
                            res.status(200).json({ RspCode: '00', Message: 'Failed' });
                        }
                    } else {
                        // Payment status already updated
                        res.status(200).json({ RspCode: '24', Message: 'This order has been updated to the payment status' });
                    }
                }
                else {
                    res.status(200).json({ RspCode: '04', Message: 'Amount invalid' })
                }
            }
            else {
                res.status(200).json({ RspCode: '01', Message: 'Order not found' })
            }
            // Handle different payment statuses

        } else {
            // Checksum failed
            res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
        }
    } catch (error) {
        console.error('Error processing VNPAY IPN:', error);
        res.status(500).json({ RspCode: '99', Message: 'Internal Server Error' });
    }
});
async function handleSuccessfulPayment(orderId, sortedParams) {
    // Save successful payment information to the database
    await db.Payment.create({
        orderId: orderId,
        totalmoney: sortedParams['vnp_Amount'],
        cart: cartManage,
        user: userManage,
        phone: phoneManage,
        address: addressManage,
        note: sortedParams['vnp_OrderInfo'],
        vnp_response_code: sortedParams['vnp_ResponseCode'],
        code_vnpay: sortedParams['vnp_TransactionNo'],
        code_bank: sortedParams['vnp_BankCode'],
        // Add other fields as needed
    });

}
async function handleFailedPayment(orderId, sortedParams) {
    // Save failed payment information to the database
    await db.Payment.create({
        orderId: orderId,
        totalmoney: sortedParams['vnp_Amount'],
        cart: cartManage,
        user: userManage,
        phone: phoneManage,
        address: addressManage,
        note: sortedParams['vnp_OrderInfo'],
        vnp_response_code: sortedParams['vnp_ResponseCode'],
        code_vnpay: sortedParams['vnp_TransactionNo'],
        code_bank: sortedParams['vnp_BankCode'],
        // Add other fields as needed
    });
    // Additional error handling or logging if required
}
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}
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
    return res.send({
        data: updatedData
    });
})
router.post("/payment_direct", middleware.authMiddleWare, paymentController.handlePaymentDirect);
router.get("/payment_history", middleware.authMiddleWare, paymentController.handlePaymentHistory);
router.get("/payment_history_succeed", paymentController.handlePaymentHistorySucceed);
module.exports = router;
