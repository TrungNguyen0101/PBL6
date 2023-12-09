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

router.get('/vnpay_return', async function (req, res, next) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = vnpayConfig.vnp_TmnCode;
    let secretKey = vnpayConfig.vnp_HashSecret;

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        res.render('success', { code: vnp_Params['vnp_ResponseCode'] })
    } else {
        res.render('success', { code: '97' })
    }
});

router.get('/vnpay_ipn', async function (req, res, next) {
    let vnp_Params = req.query;
    let secureHash = vnp_Params['vnp_SecureHash'];

    let orderId = vnp_Params['vnp_TxnRef'];
    let rspCode = vnp_Params['vnp_ResponseCode'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    let secretKey = vnpayConfig.vnp_HashSecret;
    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    let paymentStatus = '0';; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    //let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    //let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

    let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    if (secureHash === signed) {
        if (checkOrderId) {
            if (checkAmount) {
                if (paymentStatus == "0") {
                    if (rspCode == "00") {
                        // Save successful payment information to the database

                        await db.Payment.create({
                            orderId: orderId,
                            totalmoney: vnp_Params['vnp_Amount'],
                            note: vnp_Params['vnp_OrderInfo'],
                            vnp_response_code: vnp_Params['vnp_ResponseCode'],
                            code_vnpay: vnp_Params['vnp_TransactionNo'],
                            code_bank: vnp_Params['vnp_BankCode'],
                            cart: cartManage,
                            phone: phoneManage,
                            address: addressManage,
                            user: userManage,
                            time: vnp_Params['vnp_PayDate'],
                        });
                        const ids = cartManage.map(item => item._id);
                        console.log(ids[0]);
                        for (i = 0; i < ids.length; i++) {
                            const book = await db.Book.findById(ids[i]);

                            if (book) {
                                // Update the quantity field
                                book.quantity = parseInt(book.quantity) - 1;

                                // Save the updated document
                                await book.save();
                                console.log(`Quantity updated for book with _id ${ids[i]}`);
                            } else {
                                console.log(`Book with _id ${ids[i]} not found`);
                            }
                        }
                        // Respond to the client
                        res.status(200).json({
                            orderId: orderId,
                            totalmoney: vnp_Params['vnp_Amount'],
                            note: vnp_Params['vnp_OrderInfo'],
                            vnp_response_code: vnp_Params['vnp_ResponseCode'],
                            code_vnpay: vnp_Params['vnp_TransactionNo'],
                            code_bank: vnp_Params['vnp_BankCode'],
                            cart: cartManage,
                            phone: phoneManage,
                            address: addressManage,
                            user: userManage,
                            time: vnp_Params['vnp_PayDate'],
                            RspCode: '00',
                            Message: 'Success'
                        });
                    } else if (rspCode == "02") {
                        // Save failed payment information to the database
                        await db.Payment.create({
                            orderId: orderId,
                            totalmoney: vnp_Params['vnp_Amount'],
                            note: vnp_Params['vnp_OrderInfo'],
                            vnp_response_code: vnp_Params['vnp_ResponseCode'],
                            code_vnpay: vnp_Params['vnp_TransactionNo'],
                            code_bank: vnp_Params['vnp_BankCode'],
                            cart: cartManage,
                            phone: phoneManage,
                            address: addressManage,
                            user: userManage,
                            time: vnp_Params['vnp_PayDate']
                        });

                        // Respond to the client
                        res.status(200).json({
                            orderId: orderId,
                            totalmoney: vnp_Params['vnp_Amount'],
                            note: vnp_Params['vnp_OrderInfo'],
                            vnp_response_code: vnp_Params['vnp_ResponseCode'],
                            code_vnpay: vnp_Params['vnp_TransactionNo'],
                            code_bank: vnp_Params['vnp_BankCode'],
                            cart: cartManage,
                            phone: phoneManage,
                            address: addressManage,
                            user: userManage,
                            time: vnp_Params['vnp_PayDate'],
                            RspCode: '00', Message: 'Failed'
                        });
                    }
                } else {
                    // Save payment information for other statuses if needed

                    // Respond to the client
                    res.status(200).json({ RspCode: '24', Message: 'This order has been updated to the payment status' });
                }
            } else {
                res.status(200).json({ RspCode: '04', Message: 'Amount invalid' });
            }
        } else {
            res.status(200).json({ RspCode: '01', Message: 'Order not found' });
        }
    } else {
        res.status(200).json({ RspCode: '97', Message: 'Checksum failed' });
    }
});
router.post('/querydr', function (req, res, next) {

    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();

    let crypto = require("crypto");
    let moment = require('moment');
    let request = require('request');

    let vnp_TmnCode = vnpayConfig.vnp_TmnCode;
    let secretKey = vnpayConfig.vnp_HashSecret;
    let vnp_Api = vnpayConfig.vnp_Api;

    let vnp_TxnRef = req.body.orderId;
    let vnp_TransactionDate = req.body.transDate;

    let vnp_RequestId = moment(date).format('HHmmss');
    let vnp_Version = '2.1.0';
    let vnp_Command = 'querydr';
    let vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;

    let vnp_IpAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let currCode = 'VND';
    let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TxnRef + "|" + vnp_TransactionDate + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;

    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");

    let dataObj = {
        'vnp_RequestId': vnp_RequestId,
        'vnp_Version': vnp_Version,
        'vnp_Command': vnp_Command,
        'vnp_TmnCode': vnp_TmnCode,
        'vnp_TxnRef': vnp_TxnRef,
        'vnp_OrderInfo': vnp_OrderInfo,
        'vnp_TransactionDate': vnp_TransactionDate,
        'vnp_CreateDate': vnp_CreateDate,
        'vnp_IpAddr': vnp_IpAddr,
        'vnp_SecureHash': vnp_SecureHash
    };
    // /merchant_webapi/api/transaction
    request({
        url: vnp_Api,
        method: "POST",
        json: true,
        body: dataObj
    }, function (error, response, body) {
        console.log(response);
    });

});

router.post('/refund', function (req, res, next) {

    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();

    let config = require('config');
    let crypto = require("crypto");

    let vnp_TmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let vnp_Api = config.get('vnp_Api');

    let vnp_TxnRef = req.body.orderId;
    let vnp_TransactionDate = req.body.transDate;
    let vnp_Amount = req.body.amount * 100;
    let vnp_TransactionType = req.body.transType;
    let vnp_CreateBy = req.body.user;

    let currCode = 'VND';

    let vnp_RequestId = moment(date).format('HHmmss');
    let vnp_Version = '2.1.0';
    let vnp_Command = 'refund';
    let vnp_OrderInfo = 'Hoan tien GD ma:' + vnp_TxnRef;

    let vnp_IpAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;


    let vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

    let vnp_TransactionNo = '0';

    let data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TransactionType + "|" + vnp_TxnRef + "|" + vnp_Amount + "|" + vnp_TransactionNo + "|" + vnp_TransactionDate + "|" + vnp_CreateBy + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;
    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");

    let dataObj = {
        'vnp_RequestId': vnp_RequestId,
        'vnp_Version': vnp_Version,
        'vnp_Command': vnp_Command,
        'vnp_TmnCode': vnp_TmnCode,
        'vnp_TransactionType': vnp_TransactionType,
        'vnp_TxnRef': vnp_TxnRef,
        'vnp_Amount': vnp_Amount,
        'vnp_TransactionNo': vnp_TransactionNo,
        'vnp_CreateBy': vnp_CreateBy,
        'vnp_OrderInfo': vnp_OrderInfo,
        'vnp_TransactionDate': vnp_TransactionDate,
        'vnp_CreateDate': vnp_CreateDate,
        'vnp_IpAddr': vnp_IpAddr,
        'vnp_SecureHash': vnp_SecureHash
    };

    request({
        url: vnp_Api,
        method: "POST",
        json: true,
        body: dataObj
    }, function (error, response, body) {
        console.log(response);
    });

});

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
