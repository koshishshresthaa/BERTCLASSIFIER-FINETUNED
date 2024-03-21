const categoryServices = require("../services/categoryServices")
const Response = require("../utils/Response")

exports.createCategory = async (req,res) => {
    const sendData = {
        name: req.body.name
    };
    const data = await categoryServices.createCategory(sendData);
    Response.success(res, data, "Categroy created successfully");
};

exports.getCategory = async (req,res) => {
    const data = await categoryServices.getCategory();
    Response.success(res ,data, "Category got successfully");
};

exports.updateCategory = async (req,res) => {
    const sendData = {
        change_id: req.query.change_id,
        name: req.body.name
    }
    await categoryServices.updateCategory(sendData);
    Response.success(res, null, "Categroy updated successfully");
};

exports.deleteCategory = async (req,res) => {
    const sendData = {
        delete_id: req.query.delete_id
    }
    await categoryServices.deleteCategory(sendData);
    Response.success(res, null, "Category deleted successfully");
};