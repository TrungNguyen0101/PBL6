const db = require("../models/index.js");

const paymentDirect = async (user, cart, data) => {
    let result = {};
    try {
        const numberOfRandomNumbers = 10;
        const orderId = [];
        for (let i = 0; i < numberOfRandomNumbers; i++) {
            const orderId = Math.random();
            orderId.push(randomNumber);
        }
        await db.Payment.create({
            totalmoney: data.totalmoney,
            orderId: orderId,
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
