const express = require("express")
const router = express.Router();
const {
        categoryController,
} = require('../controllers/index.js')
router.get("/",categoryController.handleGetCategory);
router.patch("/update",categoryController.handleUpdateCategory);
router.post("/delete/:id",categoryController.handleDeleteCategory);
router.post("/create",categoryController.handleCreateCategory);
            
module.exports = router;