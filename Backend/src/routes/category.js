const express = require("express")
const router = express.Router();
const {
        categoryController,
} = require('../controllers/index.js')
const middleware = require('../utils/middleware.js')

router.get("/",categoryController.handleGetAllCategory);
router.patch("/update",categoryController.handleUpdateCategory);
router.post("/delete/:id",categoryController.handleDeleteCategory);
router.post("/insert",middleware.authMiddleWare,categoryController.handleCreateCategory);
            
module.exports = router;