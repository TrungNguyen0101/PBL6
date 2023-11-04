const express = require("express")
const router = express.Router();
const {
        userController,
} = require('../controllers/index.js')
const middleware = require('../utils/middleware.js')

router.get("/", (req,res)=> {
        res.send("GetUser")});
router.post("/login",userController.handleLogin);
router.post("/register",userController.handleRegister);
router.put("/update",middleware.authMiddleWare,userController.handleUpdateUser);
            
module.exports = router;