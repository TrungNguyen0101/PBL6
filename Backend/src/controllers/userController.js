const {
    userService,bookService
} = require("../services/index.js")
const handleLogin = async (req,res) => {
    let data = req.body;
    if(!data)
    {
        return res.status(500).json({
            errCode : 1,
            message: "Missing inputs parameter",
        });
    }
    let userData = await userService.handleLogin(data);
    if(userData.errCode === 0)
    {
        return res.status(200).json(userData.data);
    }
    return res.status(500).json({
        message : userData.errMessage
    });
}
const handleRegister = async (req,res)=> {
    let data = req.body;
    if(!data) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",
        })
    }
    let userData = await userService.handleRegister(data);
    if(userData.errCode === 0)
    {
        return res.status(200).json(userData.errMessage);
    }
    return res.status(500).json({
        message: userData.errMessage,
      });
}
module.exports = {
    handleLogin :handleLogin ,
    handleRegister : handleRegister
}