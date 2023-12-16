const db = require("../models/index.js");

const paymentDirect = async (user, cart, data) => {
    let result = {};
    try {
        await db.Payment.create({
            totalmoney: data.totalmoney,
            cart: cart,
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
module.exports = {
    paymentDirect
};
