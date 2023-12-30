const {
    userService, bookService
} = require("../services/index.js")
const handleLogin = async (req, res) => {
    let data = req.body;
    if (!data) {
        return res.status(500).json({
            status: 500,
            message: "Missing inputs parameter",
        });
    }
    let userData = await userService.handleLogin(data);
    if (userData.status === 200) {
        const response = {
            ...userData.data,
            status: userData.status,
            message: userData.message
        }
        return res.status(200).json(response);
    }
    const response = {
        ...userData.data,
        status: userData.status,
        message: userData.message
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
    if (userData.status === 200) {
        const response = {
            ...userData.data,
            status: 200,
            message: userData.message
        }
        return res.status(200).json(response);
    }
    const response = {
        ...userData.data,
        status: 500,
        message: userData.message
    }
    return res.status(500).json({
        response
    });
}
const handleUpdateUser = async (req, res) => {
    const user = req.User;
    const data = req.body;
    if (!data || !user) {
        return res.status(500).json({
            status: 500,
            message: "Missing inputs parameter",
        })
    }
    let message = await userService.handleUpdateUser(user, data);
    if (message.status === 200) {
        return res.status(200).json({
            user: message.user,
            status: message.status,
            message: message.message
        })
    }
    return res.status(500).json({
        status: message.status,
        message: message.message
    })
}
const handleGetUserById = async (req, res) => {
    let idUser = req.params.id;
    let user = req.User;
    let data = await userService.getUserById(user, idUser);
    console.log(data)
    if (data.status === 200) {
        return res.status(200).json({
            user: data.user,
            status: data.status,
            message: data.message
        })
    }
    return res.status(500).json({
        status: data.status,
        message: data.message
    })
}
const handleForgottenPassword = async (req, res) => {
    let email = req.body.email;
    if (!email) {
        return res.status(500).json({
            status: 500,
            message: "Missing inputs parameter",
        })
    }
    let data = await userService.forgottenPassword(email);
    if (!data) {
        return res.status(500).json(
            {
                status: data.status,
                message: data.message
            });
    }
    return res.status(200).json(
        {
            status: data.status,
            message: data.message
        })
}
const handleSendCodeVerify = async (req, res) => {
    const user = req.User.User;
    console.log(user);
    if (!user) {
        return res.status(500).json({
            status: 500,
            message: "Missing inputs parameter",
        })
    }
    let data = await userService.sendCodeVerifyUser(user);
    if (data.status === 200) {
        return res.status(200).json({
            status: data.status,
            message: data.message
        })
    }
    else {
        return res.status(500).json({
            status: data.status,
            message: data.message
        })
    }
}
const handleVerifyUser = async (req, res) => {
    let user = req.User.User
    let code = req.body.code;
    if (!code) {
        return res.status(500).json({
            status: 500,
            message: "Missing inputs parameter",
        })
    }
    let data = await userService.verifyCode(user, code);
    if (data.status === 200) {
        return res.status(200).json({
            status: data.status,
            message: data.message,
            data: data.data
        })
    }
    else {
        return res.status(500).json({
            status: data.status,
            message: data.message
        })
    }
}
const handleAddUserByAdmin = async (req, res) => {
    let data = req.body;
    if (!data) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",
        })
    }
    let userData = await userService.addUserByAdmin(data);
    if (userData.status === 200) {
        const response = {
            ...userData.data,
            status: 200,
            message: userData.message
        }
        return res.status(200).json(response);
    }
    const response = {
        ...userData.data,
        status: 500,
        message: userData.message
    }
    return res.status(500).json({
        response
    });
}
const handleChangePassword = async (req, res) => {
    let user = req.User.User;
    let oldpassword = req.body.oldpassword;
    let newpassword = req.body.newpassword;
    if (!user || !oldpassword || !newpassword) {
        return res.status(500).json({
            status: 500,
            message: "Missing inputs parameter",
        })
    }
    let data = await userService.changePassword(user, newpassword, oldpassword);
    if (data.status === 200) {
        return res.status(200).json({
            status: data.status,
            message: data.message,
        })
    }
    else {
        return res.status(500).json({
            status: data.status,
            message: data.message,
        })
    }
}
const handleGetAllAccount = async (req, res) => {
    let admin = req.User.User;
    let data = await userService.getAllAccount(admin);
    if (data.status === 200) {
        return res.status(200).json({
            account: data.account,
            status: data.status,
            message: data.message
        })
    }
    return res.status(500).json({
        status: data.status,
        message: data.message
    })
}
const handleCountByRole = async (req, res) => {
    let admin = req.User.User;
    let data = await userService.getCountByRole(admin);
    if (data.status === 200) {
        return res.status(200).json({
            data: data.countsByRole,
            status: data.status,
            message: data.message
        })
    }
    return res.status(500).json({
        status: data.status,
        message: data.message
    })
}
module.exports = {
    handleLogin,
    handleRegister,
    handleUpdateUser,
    handleGetUserById,
    handleForgottenPassword,
    handleVerifyUser,
    handleSendCodeVerify,
    handleAddUserByAdmin,
    handleChangePassword,
    handleGetAllAccount,
    handleCountByRole
}