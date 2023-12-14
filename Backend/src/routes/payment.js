const express = require("express");
const router = express.Router();
let $ = require('jquery');
const request = require('request');
const moment = require('moment');
const vnpayConfig = require('../config/vnpay')
const db = require("../models/index")
const middleware = require("../utils/middleware.js");
var cartManage;
var userManage;
var phoneManage;
var addressManage
function getDataPayment(cart, user, phone, address) {
    cartManage = cart;
    userManage = user;
    phoneManage = phone;
    addressManage = address;
}
router.get('/', function (req, res, next) {
    res.render('orderlist', { title: 'Danh sách đơn hàng' });
});
router.get('/create_payment_url', function (req, res, next) {
    res.render('order', { title: 'Tạo mới đơn hàng', amount: 10000 })
});
router.get('/querydr', function (req, res, next) {
    let desc = 'truy van ket qua thanh toan';
    res.render('querydr', { title: 'Truy vấn kết quả thanh toán' })
});
router.get('/refund', function (req, res, next) {
    let desc = 'Hoan tien GD thanh toan';
    res.render('refund', { title: 'Hoàn tiền giao dịch thanh toán' })
});
router.post('/create_payment_url', middleware.authMiddleWare, function (req, res, next) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    let ipAddr = '0.0.0.0/0'
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
    // vnp_Params['phone'] = phone;
    // vnp_Params['address'] = address;
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
        const signData = querystring.stringify(sortedParams, { encode: false });
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

        if (secureHash === signed) {
            return res.json({ code: vnp_Params['vnp_ResponseCode'], message: 'Success' });
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

        const secretKey = vnpayConfig.vnp_HashSecret; // Replace with your actual secret key
        const signData = querystring.stringify(sortedParams, { encode: false });
        const hmac = crypto.createHmac('sha512', secretKey);
        const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

        // Assume paymentStatus is retrieved from your database or another source
        let paymentStatus = '0'; // Default to '0' if not available

        if (secureHash === signed) {
            // Perform additional checks if needed (e.g., checkOrderId, checkAmount)

            // Handle different payment statuses
            if (paymentStatus === '0') {
                if (rspCode === '00') {
                    // Payment successful
                    await handleSuccessfulPayment(orderId, vnp_Params);
                    res.status(200).json({ RspCode: '00', Message: 'Success' });
                } else {
                    // Payment failed
                    await handleFailedPayment(orderId, vnp_Params);
                    res.status(200).json({ RspCode: '00', Message: 'Failed' });
                }
            } else {
                // Payment status already updated
                res.status(200).json({ RspCode: '24', Message: 'This order has been updated to the payment status' });
            }
        } else {
            // Checksum failed
            res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
        }
    } catch (error) {
        console.error('Error processing VNPAY IPN:', error);
        res.status(500).json({ RspCode: '99', Message: 'Internal Server Error' });
    }
});
async function handleSuccessfulPayment(orderId, vnp_Params) {
    // Save successful payment information to the database
    await db.Payment.create({
        orderId: orderId,
        totalmoney: vnp_Params['vnp_Amount'],
        note: vnp_Params['vnp_OrderInfo'],
        vnp_response_code: vnp_Params['vnp_ResponseCode'],
        code_vnpay: vnp_Params['vnp_TransactionNo'],
        code_bank: vnp_Params['vnp_BankCode'],
        // Add other fields as needed
    });

    // Update other related data in the database (e.g., book quantities)
}

async function handleFailedPayment(orderId, vnp_Params) {
    // Save failed payment information to the database
    await db.Payment.create({
        orderId: orderId,
        totalmoney: vnp_Params['vnp_Amount'],
        note: vnp_Params['vnp_OrderInfo'],
        vnp_response_code: vnp_Params['vnp_ResponseCode'],
        code_vnpay: vnp_Params['vnp_TransactionNo'],
        code_bank: vnp_Params['vnp_BankCode'],
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
    console.log(payments)
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
module.exports = router;
