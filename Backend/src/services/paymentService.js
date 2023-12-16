const db = require("../models/index.js");

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
module.exports = {
    paymentDirect, paymenHistory, paymenHistorySucceed
};
