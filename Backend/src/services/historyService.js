const db = require("../models/index.js");

const getDetailHistoryByID = async (id_user, id_book, data) => {
    let historyData = {};
    try {
        const history = await db.History.find({});
        historyData.history = history;
        historyData.status = 200;
        historyData.errMessage = "Get detail history succeed";
    } catch (e) {
        historyData.status = 500;
        historyData.errMessage = e;
    }
    return historyData;
};
module.exports = {
    getDetailHistoryByID
};
