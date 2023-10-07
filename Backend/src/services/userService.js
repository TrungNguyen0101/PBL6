const userController = require('../controllers/index.js')
const User = require('../models/User.js');
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const login = async({email, password})=> {
    console.log("login success")
}
const register = async(data)=> {
    let userData = {};
    try {
        const userExist = await User.find({email:data.email}).exec();
        console.log("aaa" + userExist)
        if(userExist) {
            userData.errCode = 2;
            userData.errMessage = "User already exists"
            return userData
        }
        let hashPassword = await bcrypt.hashSync(data.password, salt);
        await User.create({
            username : data.username,
            email : data.email,
            password : hashPassword
        })
        userData.errCode = 0;
        userData.errMessage = "Create users succeed";
    } catch (e) {
        userData.errCode = 2;
        userData.errMessage = "Create users failed";
    }
    return userData;
}
module.exports = {
    login : login,
    register : register
}