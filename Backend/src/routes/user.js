const express = require("express")
const router = express.Router();
const {
        userController,
} = require('../controllers/index.js')
router.get("/", (req,res)=> {
        res.send("GetUser")});
router.post("/login",userController.handleLogin);
router.post("/register",userController.handleRegister);
            
module.exports = router;