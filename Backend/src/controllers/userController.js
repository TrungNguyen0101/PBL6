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
            status: 200,
            message : userData.message
        }
        return res.status(200).json(response);
    }
    const response = {
        ...userData.data,
        status: 404,
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
            message : userData.message
        }
        return res.status(200).json(response);
    }
    const response = {
        ...userData.data,
        status: 500,
        message : userData.message
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
            status: 500,
            message: "Missing inputs parameter",
        })
    }
    let message = await userService.handleUpdateUser(user,data);
    return res.status(200).json(message);
}
const handleGetUserById = async (req,res)=> {
    let idUser = req.params.id;
    let user = req.User;
    let data = await userService.getUserById(user,idUser);
    console.log(data)
    if(data.status === 200)
    {
        return res.status(200).json({
            user: data.user,
            status : data.status,
            message: data.message
        })
    }
    return res.status(500).json({
        status : data.status,
        message: data.message
    })
}
const handleForgottenPassword = async(req,res) => {
    let email = req.body.email;
    if(!email){
        return res.status(500).json({
            status: 500,
            message: "Missing inputs parameter",
        })
    }
    let data = await userService.forgottenPassword(email);
    if(!data)
    {
        return res.status(500).json(
           { status: data.status,
            message: data.message});
    }
    return res.status(200).json(
        {  status: data.status,
           message :data.message})
}
const handleSendCodeVerify = async(req,res) => {
    const user = req.User.User;
    if(!user) {
        return res.status(500).json({
            status: 500,
            message : "Missing inputs parameter",
        })
    }
    let data = await userService.verifyUser(user);
    if(data.status === 200)
    {
        const code = req.body.code;
        let compare = await userService.compareVerifyCode(user,code);
        if(compare.status === 200)
        {
            return res.status(200).json({
                status: compare.status,
                message : compare.message
            })
        }
        else {
            return res.status(500).json({
                status: compare.status,
                message : compare.message
            })
        }
    }
    else {
        return res.status(500).json({
            status: data.status,
            message : data.message
        })
    }
}
const handleVerifyUser = async(req,res) => {

}
module.exports = {
    handleLogin,
    handleRegister,
    handleUpdateUser,
    handleGetUserById,
    handleForgottenPassword,
    handleVerifyUser,
    handleSendCodeVerify
}