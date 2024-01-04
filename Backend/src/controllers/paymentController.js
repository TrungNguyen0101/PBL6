const {
    paymentService
} = require("../services/index.js")

const handlePaymentDirect = async (req, res) => {
    const user = req.User.User;
    const cart = req.body.cart;
    const data = req.body;
    if (!data || !user || !cart) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",
        })
    }
    let result = await paymentService.paymentDirect(user, cart, data);
    if (result.status === 200) {
        return res.status(200).json({
            message: result.message
        })
    }
    return res.status(500).json({
        message: result.message
    })
}
const handlePaymentHistory = async (req, res) => {
    const user = req.User.User;
    if (!user) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",
        })
    }
    let result = await paymentService.paymenHistory(user);
    if (result.status === 200) {
        return res.status(200).json({
            data: result.data,
            message: result.message
        })
    }
    return res.status(500).json({
        message: result.message
    })
}
const handlePaymentHistorySucceed = async (req, res) => {
    let result = await paymentService.paymenHistorySucceed();
    if (result.status === 200) {
        return res.status(200).json({
            data: result.data,
            message: result.message
        })
    }
    return res.status(500).json({
        message: result.message
    })
}
const handlePaymentOnline = async (req, res) => {
    let data = req.query;
    if (!data) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",
        })
    }
    let result = await paymentService.paymenOnline(data);
    if (result.status === 200) {
        return res.status(200).json({
            rspCode: result.response,
            message: result.message
        })
    }
    return res.status(500).json({
        message: result.message
    })
}
const handleCreate_payment_url = async (req, res) => {
    let user = req.User.User;
    let data = req.body;
    let ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    if (!data) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",
        })
    }
    let result = await paymentService.createpayment(user, ip, data);
    if (result.status === 200) {
        return res.status(200).json({
            data: result.data,
            message: result.message
        })
    }
    return res.status(500).json({
        message: result.message
    })
}
const handleGetDetailPaymentByID = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(404).json({
            errCode: 1,
            message: "Missing inputs parameter",
        })
    }
    let result = await paymentService.getdetailPayment(id);
    if (result.status === 200) {
        return res.status(200).json({
            data: result.data,
            message: result.message
        })
    }
    return res.status(500).json({
        message: result.message
    })
}
module.exports = {
    handlePaymentDirect, handlePaymentHistory, handlePaymentHistorySucceed, handlePaymentOnline, handleCreate_payment_url, handleGetDetailPaymentByID
};
