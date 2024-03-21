const Category = require("../datalayer/Category")

exports.createCategory = async (data) => {
    await Category.createCategory(data)
    return true;
}

exports.getCategory = async (data) => {
    const returnData = await Category.getCategory(data)
    return returnData;
}

exports.updateCategory = async (data) => {
    await Category.updateCategory(data)
    return true;
}

exports.deleteCategory = async (data) => {
    await Category.deleteCategory(data)
    return true;
}