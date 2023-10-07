const express = require("express")
const router = express.Router();
const {
        userController,
        bookController
} = require('../controllers/index.js')
router.get("/", (req,res)=> {
        res.send("GetUser")});
router.post("/login",userController.login);
router.post("/register",userController.register);
            
module.exports = router;