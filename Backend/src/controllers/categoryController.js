const {
    categoryController, categoryService
} = require("../services/index.js")
const fs = require('fs');
function getByteArray(filePath) {
    let fileData = fs.readFileSync(filePath);
    return fileData;
  }
const handleCreateCategory = async (req,res) => {
    try {
        const file = Object.values(req.files).flat()[0];
        let data = req.body;
        if(file)
        {
            data.image = getByteArray(file.tempFilePath);
        }else {
            data.image = null;
        }
        const user = req.User;
        if(!data) {
            return res.status(500).json({
                status: 500,
                message: "Missing inputs parameter",
              });
        }
        let categoryData = await categoryService.insertCategory(data,user);
        if(categoryData.status === 200)
        { return res.status(200).json({
            status: categoryData.status,
            message: categoryData.errMessage
        })}
        return res.status(500).json({
            status: categoryData.status,
            message: categoryData.errMessage
        })
    } catch (e) {
        return res.status(500).json({
            status: 400,
            message: e });
    }
}
const handleUpdateCategory = async (req,res)=> {
    
}
const handleDeleteCategory = async (req,res) => {

}
const handleGetAllCategory = async (req,res)=> {
    try {
        let data = await categoryService.getAllCategory();
        if(!data) return res.status(500).json("Error!")
        if (data.status === 200) return res.status(200).json(data.category);
    } catch (error) {
        return res.status(500).json({
            status: data.status,
            message: data.errMessage });
    }
}
module.exports = {
    handleCreateCategory :handleCreateCategory,
    handleUpdateCategory : handleUpdateCategory,
    handleDeleteCategory :handleDeleteCategory,
    handleGetAllCategory: handleGetAllCategory
}