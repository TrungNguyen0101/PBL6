const Category = require("../models/Category.js");
const db = require("../models/index.js");

const insertCategory = async (data) => {
  let categoryData = {};
  try {
    await db.Category.create(data);
    categoryData.errCode = 0;
    categoryData.errMessage = "Create category succeed";
  } catch (e) {
    categoryData.errCode = 2;
    categoryData.errMessage = "Create category failed";
  }
  return categoryData;
};
const updateCategory = async () => {};
const getAllCategory = async () => {
  let categoryData = {};
  try {
    const category = await db.Category.find();
    categoryData.categories = category;
    categoryData.errCode = 0;
    categoryData.errMessage = "Get all category succeed";
  } catch (e) {
    categoryData.errCode = 2;
    categoryData.errMessage = "Get all category failed";
  }
  return categoryData;
};

const deleteCategory = async () => {};
module.exports = {
  insertCategory: insertCategory,
  updateCategory: updateCategory,
  getAllCategory: getAllCategory,
  deleteCategory: deleteCategory,
};
