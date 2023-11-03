const userController = require('../controllers/index.js')
const db = require('../models/index.js');
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const GeneralAccessToken = (data) => {
    const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "60",
    });
    return access_token;
  };
const handleLogin = async(data)=> {
    let userData = {};
    try {
        const user = await db.User.findOne({email:data.email}).exec();
        if(user) {
            let isMatch = await bcrypt.compare(data.password,user.password);
            if(isMatch) 
            {
                const access_token = GeneralAccessToken({
                    id : user._id.toString(),
                    roleID : user.roleID
                })
                userData.errCode = 0;
                userData.errMessage = "Login succeed!";
                delete user.password;
                userData.data  = {
                    access_token,user
                }
            }
            else {
                userData.errCode = 2;
                userData.errMessage = "Wrong password!"
            }
            return userData;
        }
        else {
            userData.errCode = 2;
            userData.errMessage = "Account does not exist";
            }
        return userData;
    }
    catch (error) {
        userData.errCode = 2;
        userData.errMessage = "Email address is invalid!"
    }
    return userData;
}
const handleRegister = async(data)=> {
    let userData = {};
    try {
        const user = await db.User.findOne({email:data.email}).exec();
        if(user) {
            userData.errCode = 2;
            userData.errMessage = "User already exists"
            return userData;
        }
        let hashPassword = await bcrypt.hashSync(data.password, salt);
        await db.User.create({
            username : data.username,
            email : data.email,
            password : hashPassword,
            roleID : "2"
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
    handleLogin : handleLogin,
    handleRegister : handleRegister
}