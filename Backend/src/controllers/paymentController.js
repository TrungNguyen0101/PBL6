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
module.exports = {
    handlePaymentDirect
};