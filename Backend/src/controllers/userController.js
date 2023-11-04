const {
    userService, bookService
} = require("../services/index.js")
const handleLogin = async (req, res) => {
    let data = req.body;
    if (!data) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",
        });
    }
    let userData = await userService.handleLogin(data);
    if (userData.errCode === 0) {
        const response = {
            ...userData.data,
            status: 200,
            message : userData.errMessage
        }
        return res.status(200).json(response);
    }
    const response = {
        ...userData.data,
        status: 404,
        message: userData.errMessage
    }
    return res.status(404).json({
        response
    });
}
const handleRegister = async (req, res) => {
    let data = req.body;
    if (!data) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",
        })
    }
    let userData = await userService.handleRegister(data);
    if (userData.errCode === 0) {
        const response = {
            ...userData.data,
            status: 200,
            message : userData.errMessage
        }
        return res.status(200).json(response);
    }
    const response = {
        ...userData.data,
        status: 500,
        message : userData.errMessage
    }
    return res.status(500).json({
        response
    });
}
const handleUpdateUser = async (req, res) => {
    const user = req.User;
    const data = req.body;
    if (!data) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",
        })
    }
    let message = await userService.handleUpdateUser(user,data);
    return res.status(200).json(message);
}
module.exports = {
    handleLogin: handleLogin,
    handleRegister: handleRegister,
    handleUpdateUser: handleUpdateUser
}