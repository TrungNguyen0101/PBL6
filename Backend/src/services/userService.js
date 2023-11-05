const userController = require('../controllers/index.js')
const db = require('../models/index.js');
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const GeneralAccessToken = (data) => {
    const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
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
                    User : user,
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
            roleID : "2",
            phoneNumber: "",
        })
        userData.errCode = 0;
        userData.errMessage = "Create users succeed";
    } catch (e) {
        userData.errCode = 2;
        userData.errMessage = "Create users failed";
    }
    return userData;
}
const handleUpdateUser = async(user,data) => {
    let userData = {};
    try {
        if(!user)
        {
            userData.errCode = 2;
            userData.errMessage = "Missing required parameter";
            return userData;
        }
        let users = await db.User.findOne({email:user.User.email}).exec();
        if(users._id.toString() === user.id || user.User.roleID === "0")
        {
            if(users) {
                users.username = data.username;
                users.phoneNumber = data.phoneNumber;
                await users.save();
                userData.status = 200;
                userData.errMessage= "Update user succeeds"
                return {
                    ...userData,
                    user : users
                }
            }
            else {
                userData.errCode = 404;
                userData.errMessage= "User's not found!"
            }
        }
        else {
            userData.errCode = 500;
            userData.errMessage= "Missing required parameter"
            return userData;
        }
    } catch (e) {
        console.log(e);
    }
    return userData;
}
module.exports = { 
    handleLogin : handleLogin,
    handleRegister : handleRegister,
    handleUpdateUser: handleUpdateUser
}