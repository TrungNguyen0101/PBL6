const db = require("../models/index.js");
const request = require('request');
const moment = require('moment');
const vnpayConfig = require('../config/vnpay')
var cartManage;
var userManage;
var phoneManage;
var addressManage;
var nameManage;
function getDataPayment(name, cart, user, phone, address) {
    nameManage = name;
    cartManage = cart;
    userManage = user;
    phoneManage = phone;
    addressManage = address;
}
const paymentDirect = async (user, cart, data) => {
    let result = {};
    try {
        const numberOfRandomIntegers = 10;
        let orderId = "";
        for (let i = 0; i < numberOfRandomIntegers; i++) {
            const randomInteger = Math.floor(Math.random() * 10);
            orderId += randomInteger;
        }
        await db.Payment.create({
            totalmoney: data.totalmoney,
            orderId: orderId,
            cart: cart,
            name: data.name,
            user: user,
            phone: data.phone,
            address: data.address,
            status: 1,
            payment_method: "OFF"
        })
        result.status = 200;
        result.message = "Succeed";
    } catch (e) {
        result.status = 500;
        result.message = e;
    }
    return result
}
const paymenHistory = async (user) => {
    let result = {};
    try {
        let data = await db.Payment.find({});
        const newData = data.filter((p) => p.user._id === user._id);
        result.data = newData
        result.status = 200;
        result.message = "Succeed";
    } catch (e) {
        result.status = 500;
        result.message = e;
    }
    return result
}
const paymenHistorySucceed = async () => {
    let result = {};
    try {
        let data = await db.Payment.find({});
        const newData = data.filter((p) => p.status === 3);
        console.log(newData)
        result.data = newData
        result.status = 200;
        result.message = "Succeed";
    } catch (e) {
        result.status = 500;
        result.message = e;
    }
    return result
}
const paymenOnline = async (data) => {
    let result = {};
    try {
        const vnp_Params = data;
        const secureHash = vnp_Params['vnp_SecureHash'];

        const orderId = vnp_Params['vnp_TxnRef'];
        const rspCode = vnp_Params['vnp_ResponseCode'];
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
        let paymentStatus = '0'; // Default to '0' if not available
        let checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
        let checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
        const payment = await db.Payment.findOne({ orderId: orderId }).exec();
        if (secureHash === signed) {
            if (checkOrderId) {
                if (checkAmount) {
                    if (paymentStatus === '0') {
                        if (rspCode === '00') {
                            // Payment successful
                            if (!payment) {
                                await db.Payment.create({
                                    orderId: vnp_Params["vnp_TxnRef"],
                                    totalmoney: vnp_Params["vnp_Amount"] / 100,
                                    note: vnp_Params["vnp_OrderInfo"],
                                    vnp_response_code: vnp_Params["vnp_ResponseCode"],
                                    code_vnpay: vnp_Params["vnp_TransactionNo"],
                                    code_bank: vnp_Params["vnp_BankCode"],
                                    user: userManage,
                                    cart: cartManage,
                                    name: nameManage,
                                    phone: phoneManage,
                                    address: addressManage,
                                    time: vnp_Params["vnp_PayDate"],
                                    payment_method: "ONL"
                                })
                            }
                            result.response = rspCode
                            result.status = 200;
                            result.message = "Online payment is successful";
                        } else {
                            // Payment failed
                            if (!payment) {
                                await db.Payment.create({
                                    orderId: vnp_Params["vnp_TxnRef"],
                                    totalmoney: vnp_Params["vnp_Amount"] / 100,
                                    note: vnp_Params["vnp_OrderInfo"],
                                    vnp_response_code: vnp_Params["vnp_ResponseCode"],
                                    code_vnpay: vnp_Params["vnp_TransactionNo"],
                                    code_bank: vnp_Params["vnp_BankCode"],
                                    user: userManage,
                                    cart: cartManage,
                                    name: nameManage,
                                    phone: phoneManage,
                                    address: addressManage,
                                    time: vnp_Params["vnp_PayDate"],
                                    payment_method: "ONL"
                                })
                                result.response = rspCode
                                result.status = 200;
                                result.message = "Online payment is failed";
                            }
                        }
                    } else {
                        result.response = rspCode
                        result.status = 200;
                        result.message = "This order has been updated to the payment status";
                    }
                }
                else {
                    result.response = rspCode
                    result.status = 200;
                    result.message = "Amount invalid";
                }
            }
            else {
                result.response = rspCode
                result.status = 200;
                result.message = "Order not found";
            }
        } else {
            result.status = 200;
            result.message = "Checksum failed";
        }
    } catch (e) {
        result.status = 500;
        result.message = e;
    }
    return result
}
const createpayment = async (users, ip, data) => {
    let result = {};
    try {
        process.env.TZ = 'Asia/Ho_Chi_Minh';
        let date = new Date();
        let createDate = moment(date).format('YYYYMMDDHHmmss');
        let ipAddr = ip;
        let tmnCode = vnpayConfig.vnp_TmnCode;
        let secretKey = vnpayConfig.vnp_HashSecret;
        let vnpUrl = vnpayConfig.vnp_Url;
        let returnUrl = vnpayConfig.vnp_ReturnUrl;
        let orderId = moment(date).format('DDHHmmss');
        let amount = data.amount;
        let bankCode = data.bankCode;
        let name = data.name;
        let cart = data.cart;
        let user = users;
        let phone = data.phone;
        let address = data.address;
        let locale = data.language;
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
        getDataPayment(name, cart, user, phone, address);
        vnp_Params = sortObject(vnp_Params);
        let querystring = require('qs');
        let signData = querystring.stringify(vnp_Params, { encode: false });
        let crypto = require("crypto");
        let hmac = crypto.createHmac("sha512", secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
        result.status = 200;
        result.data = vnpUrl;
        result.message = "Create url succeed!"
    } catch (error) {
        result.status = 500;
        result.message = "Create url failed!"
    }
    return result;
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
const getdetailPayment = async (id) => {
    const result = {};
    try {
        const books = await db.Payment.findById(id);
        result.data = books;
        result.status = 200;
        result.message = "Get Detail Succeed!"
    } catch (e) {
        result.status = 500;
        result.message = e;
    }
    return result;
}
module.exports = {
    paymentDirect, paymenHistory, paymenHistorySucceed, createpayment, paymenOnline, getdetailPayment
};
