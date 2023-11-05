const categoryService
 = require('../controllers/index.js')
const Book = require('../models/Book.js');
const db = require('../models/index.js');

const insertCategory = async(data,user) => {
    let categoryData = {};
    try {
        let user = await db.User.findOne({id : user.id}).exec();
        categoryData.status = 200;
        categoryData.errMessage = "ok";
        console.log(user);
    } catch (e) {
        categoryData.status = 500;
        categoryData.errMessage = e;
    }
    return categoryData

}
const updateCategory = async()=> {
    
}
const getAllCategory = async()=> {
    let data = {};
    try {
        let category = await db.Category.find({});
        category = category.map((sche)=> {
            if(sche.image == null) return sche;
            sche.image = Buffer.from(sche.image).toString("base64");
            return sche;
        })
        data.category = category;
        data.status = 200;
        return data;
    } catch (e) {
        data.status = 500;
        data.errMessage = e;
        return data;
    }
}
const deleteCategory = async()=> {
    
}
module.exports = {
    insertCategory:insertCategory,
    updateCategory:updateCategory,
    getAllCategory:getAllCategory,
    deleteCategory : deleteCategory
}