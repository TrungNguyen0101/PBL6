const {
    userService,bookService
} = require("../services/index.js")
const login = async (req,res) => {
    let data = req.body;
    if(!data)
    {
        return res.status(500).json({
            errCode : 1,
            message: "Missing inputs parameter",
        });
    }
    await userService.login({email,password})
    //call service
    res.status(200).json({
        message : "Login Successed"
    })
}
const register = async (req,res)=> {
    let data = req.body;
    if(!data) {
        return res.status(500).json({
            errCode: 1,
            message: "Missing inputs parameter",
        })
    }
    let userData = await userService.register(data);
    console.log(userData)
    if(userData.errCode == 0)
    {
        return res.status(200).json(userData.errMessage);
    }
    return res.status(500).json({
        message: userData.errMessage,
      });
}
module.exports = {
    login :login ,
    register : register
}