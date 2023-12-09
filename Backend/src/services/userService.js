const userController = require('../controllers/index.js')
const db = require('../models/index.js');
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const mailConfig = require('../config/mail')
const nodemailer = require('nodemailer');
require('dotenv/config')
const GeneralAccessToken = (data) => {
    const access_token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
    return access_token;
};
const handleLogin = async (data) => {
    let userData = {};
    try {
        const user = await db.User.findOne({ email: data.email }).exec();
        if (user) {
            let isMatch = await bcrypt.compare(data.password, user.password);
            if (isMatch) {
                const access_token = GeneralAccessToken({
                    id: user._id.toString(),
                    User: user,
                })
                userData.status = 200;
                userData.message = "Login succeed!";
                userData.data = {
                    access_token,
                    user: {
                        _id: user._id,
                        username: user.username,
                        phoneNumber: user.phoneNumber,
                        email: user.email,
                        roleID: user.roleID,
                        isVerified: user.isVerified,
                        avatar: user.avatar,
                    }
                }
            }
            else {
                userData.status = 500;
                userData.message = "Wrong password!"
            }
            return userData;
        }
        else {
            userData.status = 500;
            userData.message = "Account does not exist";
        }
        return userData;
    }
    catch (error) {
        userData.status = 500;
        userData.message = "Email address is invalid!"
    }
    return userData;
}
const handleRegister = async (data) => {
    let userData = {};
    try {
        const user = await db.User.findOne({ email: data.email }).exec();
        if (user) {
            userData.status = 500;
            userData.message = "User already exists"
            return userData;
        }
        let hashPassword = await bcrypt.hashSync(data.password, salt);
        await db.User.create({
            username: data.username,
            email: data.email,
            password: hashPassword,
            roleID: "3",
            phoneNumber: "",
            verificationCode: "",
            avatar: ""
        })
        userData.status = 200;
        userData.message = "Create users succeed";
    } catch (e) {
        userData.status = 500;
        userData.message = "Create users failed";
    }
    return userData;
}
const handleUpdateUser = async (user, data) => {
    let userData = {};
    try {
        if (!data.avatar) data.avatar = "";
        let users = await db.User.findOne({ email: user.User.email }).exec();
        if (users._id.toString() === user.id) {
            if (users) {
                users.username = data.username;
                users.phoneNumber = data.phoneNumber;
                users.avatar = data.avatar;
                await users.save();
                userData.user = users
                userData.status = 200;
                userData.message = "Update user succeeds"
            }
            else {
                userData.errCode = 404;
                userData.message = "User's not found!"
            }
            return userData;
        }
        else {
            userData.errCode = 500;
            userData.message = "Missing required parameter"
            return userData;
        }
    } catch (e) {
        console.log(e);
    }
    return userData;
}
const getUserById = async (user, id) => {
    let data = {};
    try {
        const userbyid = await db.User.findById(id);
        if (!userbyid) {
            data.status = 404;
            data.message = "Not found!"
            return data;
        }
        data.user = userbyid;
        data.status = 200;
        data.message = "Get User By ID Succeed"
        return data;
    } catch (error) {
        data.status = 500;
        data.message = error;
    }
    return data;
}
const forgottenPassword = async (email) => {
    let data = {};
    const user = await db.User.findOne({ email: email }).exec();
    if (user) {
        const numbers = '0123456789';
        const characters = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
        const special = '!@$%&*';
        const lowercaseCharacters = 'qwertyuiopasdfghjklzxcvbnm';
        const uppercaseCharacters = 'QWERTYUIOPASDFGHJKLZXCVBNM';

        const passwordLength = 8; // Độ dài mật khẩu mong muốn
        let newPasswordProgress = '';

        // Chọn ít nhất 1 số, 1 ký tự thường, 1 ký tự in hoa, và 1 ký tự đặc biệt
        newPasswordProgress += numbers.charAt(Math.floor(Math.random() * numbers.length));
        newPasswordProgress += lowercaseCharacters.charAt(Math.floor(Math.random() * lowercaseCharacters.length));
        newPasswordProgress += uppercaseCharacters.charAt(Math.floor(Math.random() * uppercaseCharacters.length));
        newPasswordProgress += special.charAt(Math.floor(Math.random() * special.length));

        // Số ký tự cần chọn thêm sau khi đã có ít nhất 1 ký tự từ mỗi nhóm
        const remainingChars = passwordLength - newPasswordProgress.length;

        // Tạo mật khẩu ngẫu nhiên với các ký tự còn lại từ tất cả các loại ký tự
        const allCharacters = characters + numbers + special;
        for (let i = 0; i < remainingChars; i++) {
            const randomIndex = Math.floor(Math.random() * allCharacters.length);
            newPasswordProgress += allCharacters.charAt(randomIndex);
        }
        const newPassword = newPasswordProgress
        const transporter = nodemailer.createTransport({
            tls: {
                rejectUnauthorized: false
            },
            host: mailConfig.HOST,
            port: mailConfig.PORT,
            secure: false,
            auth: {
                user: mailConfig.USERNAME,
                pass: mailConfig.PASSWORD,
            },
        });

        const mailOptions = {
            from: mailConfig.FROM_ADDRESS,
            to: user.email,
            subject: 'NTHDV - Xác thực tài khoản',
            text: `
                    NTHDV
                    
                    Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi, 
        
                    Chúng tôi xin gửi mật khẩu của bạn là: ${newPassword}
                    `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending verification email', error);
            } else {
                console.log('Verification email sent', info.response);
            }
        });
        let hashPassword = await bcrypt.hashSync(newPassword, salt);
        user.password = hashPassword;
        user.save();
        data.status = 200;
        data.message = "Reset password succeedfully";
    } else {
        data.status = 404;
        data.message = "User not found!";
    }
    return data;
}
const sendCodeVerifyUser = async (data) => {
    const dataUser = {};
    const codeLength = 6;
    const characters = '0123456789';
    let verificationCodeProgress = '';
    for (let i = 0; i < codeLength; i++) {
        verificationCodeProgress += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const verificationCode = verificationCodeProgress
    const user = await db.User.findOne({ email: data.email }).exec();
    if (user) {
        user.verificationCode = verificationCode
        user.save();
    }
    if (data) {
        const transporter = nodemailer.createTransport({
            tls: {
                rejectUnauthorized: false
            },
            host: mailConfig.HOST,
            port: mailConfig.PORT,
            secure: false,
            auth: {
                user: mailConfig.USERNAME,
                pass: mailConfig.PASSWORD,
            },
        });

        const mailOptions = {
            from: mailConfig.FROM_ADDRESS,
            to: data.email,
            subject: 'NTHDV - Xác thực tài khoản',
            text: `
                    NTHDV
                    
                    Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi, 
        
                    Chúng tôi xin gửi mã xác thực của bạn là: ${verificationCode}
                    `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending verification email', error);
            } else {
                console.log('Verification email sent', info.response);
            }
        });
        dataUser.status = 200;
        dataUser.message = "Send verify code succeed!";
    }
    else {
        dataUser.status = 404;
        dataUser.message = "User not found!";
    }
    return dataUser
}
const verifyCode = async (data, code) => {
    const userData = {};
    const user = await db.User.findOne({ email: data.email }).exec();
    if (!user || !code) {
        userData.status = 500;
        userData.message = "Missing required parameter";
        return userData;
    }
    if (user.verificationCode === code) {
        user.isVerified = true;
        user.save();
        userData.status = 200;
        userData.message = "Verify successfully";
        userData.data = {
            user: {
                _id: user._id,
                username: user.username,
                phoneNumber: user.phoneNumber,
                email: user.email,
                roleID: user.roleID,
                isVerified: user.isVerified
            }
        }
    }
    else {
        userData.status = 500;
        userData.message = "Verify failed";
    }
    return userData;
}
const addUserByAdmin = async (data) => {
    let userData = {};
    try {
        const user = await db.User.findOne({ email: data.email }).exec();
        if (user) {
            userData.status = 500;
            userData.message = "User already exists"
            return userData;
        }
        let hashPassword = await bcrypt.hashSync(data.password, salt);
        await db.User.create({
            username: data.username,
            email: data.email,
            password: hashPassword,
            roleID: "1",
            phoneNumber: "",
            verificationCode: "",
            avatar: ""
        })
        userData.status = 200;
        userData.message = "Create users succeed";
    } catch (e) {
        userData.status = 500;
        userData.message = "Create users failed";
    }
    return userData;
    // const userData = {};
    // try {
    //     if (admin.roleID === "1") {
    //         const user = await db.User.findOne({ email: data.email }).exec();
    //         if (user) {
    //             userData.status = 500;
    //             userData.message = "User already exists"
    //             return userData;
    //         }
    //         let hashPassword = await bcrypt.hashSync(data.password, salt);
    //         if (data.roleID === "1") {
    //             await db.User.create({
    //                 username: data.username,
    //                 email: data.email,
    //                 password: hashPassword,
    //                 roleID: data.roleID,
    //                 phoneNumber: data.phoneNumber,
    //                 verificationCode: "",
    //                 isVerified: true,
    //             })
    //             userData.status = 200;
    //             userData.message = "Create user succeed";
    //             return userData;
    //         }
    //         await db.User.create({
    //             username: data.username,
    //             email: data.email,
    //             password: hashPassword,
    //             roleID: data.roleID,
    //             phoneNumber: data.phoneNumber,
    //             verificationCode: "",
    //             isVerified: false,
    //         })
    //         userData.status = 200;
    //         userData.message = "Create user succeed";
    //         return userData;
    //     }
    //     userData.status = 500;
    //     userData.message = "You are not an admin";
    //     return userData;
    // } catch (e) {
    //     userData.status = 500;
    //     userData.message = "Require inter parameter!";
    // }
    // return userData;
}

const changePassword = async (user, newpassword, oldpassword) => {
    let data = {};
    try {
        const userbyid = await db.User.findById(user._id);
        if (userbyid) {
            let isMatch = await bcrypt.compare(oldpassword, userbyid.password);
            if (isMatch) {
                let hashPassword = await bcrypt.hashSync(newpassword, salt);
                userbyid.password = hashPassword;
                userbyid.save();
                data.status = 200;
                data.message = "Change password succeed!";
            }
            else {
                data.status = 500;
                data.message = "Wrong password";
            }
        }
    } catch (error) {
        data.status = 500;
        data.message = error;
    }
    return data;
}
const getAllAccount = async (data) => {
    let userData = {};
    try {
        if (data.roleID === "1") {
            const account = await db.User.find();
            userData.account = account;
            userData.status = 200;
            userData.message = "Get all account";
            return userData;
        }
        userData.status = 500;
        userData.message = "You are not an admin";
        return userData;
    } catch (e) {
        userData.status = 500;
        userData.message = e;
    }
    return userData;
}
const getCountByRole = async (data) => {
    let userData = {};
    try {
        if (data.roleID === "1") {
            const countsByRole = await db.User.aggregate([
                { $group: { _id: "$roleID", totalaccount: { $sum: 1 } } },
            ]);
            userData.status = 200;
            userData.message = "Get count by role";
            userData.countsByRole = countsByRole;
            return userData;
        }
        userData.status = 500;
        userData.message = "You are not an admin";
        return userData;
    } catch (e) {
        userData.status = 500;
        userData.message = e;
    }
    return userData;
}
module.exports = {
    handleLogin,
    handleRegister,
    handleUpdateUser,
    getUserById,
    forgottenPassword,
    sendCodeVerifyUser,
    verifyCode,
    addUserByAdmin,
    changePassword,
    getAllAccount,
    getCountByRole,
}