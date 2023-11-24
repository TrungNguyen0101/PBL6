const express = require("express")
const router = express.Router();
const {
        userController,
} = require('../controllers/index.js')
const middleware = require('../utils/middleware.js');
const { userService } = require("../services/index.js");

// router.get("/", (req,res)=> {
//         res.send("GetUser")});
router.post("/login", userController.handleLogin);
router.post("/register", userController.handleRegister);
router.put("/update", middleware.authMiddleWare, userController.handleUpdateUser);
router.get("/getId/:id", middleware.authMiddleWare, userController.handleGetUserById);
router.post("/forgot-password", userController.handleForgottenPassword);
router.post("/sendcode-verify", middleware.authMiddleWare, userController.handleSendCodeVerify);
router.post("/verify", middleware.authMiddleWare, userController.handleVerifyUser);
router.post("/add-user-by-admin", middleware.authMiddleWare, userController.handleAddUserByAdmin);
router.post("/change-password", middleware.authMiddleWare, userController.handleChangePassword);
router.get("/getallaccount", middleware.authMiddleWare, userController.handleGetAllAccount);
router.get("/getCountByRole", middleware.authMiddleWare, userController.handleCountByRole);
module.exports = router;