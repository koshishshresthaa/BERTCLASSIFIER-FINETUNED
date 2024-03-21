const newsServices = require("../services/newsServices")
const Response = require("../utils/Response")
const axios = require("axios")
const categoryDatalayer = require("../datalayer/Category")
const IMAGE_BASE_URL = "http://localhost:3001/"

exports.createPost = async(req,res) => {
    try {
        const {body} = req;
        const send_data = {
            source : body.source,
            news_title: body.news_title,
            news_body : body.news_body,
            // news_class : body.news_class,
            // CategoryId: body.CategoryId,
            UserId: body.UserId,
            photo: IMAGE_BASE_URL + req.file?.filename
        }
        // Validate nepali only
        const pattern = /[\u0900-\u097F]+/
        const validatePattern = pattern.test(send_data.news_body);
        if (!validatePattern) {
            Response.error(res, 400, "Only Nepali news is allowed");
            return;
        }
        console.log("TEST TEST")
        const category = await getCategory(send_data.news_body)
        console.log("ahsjaoisj")
        send_data.news_class = category;
        const categoryInfo = await categoryDatalayer.findCateogryByQuery({ name: category })
        if(!categoryInfo) {
            Response.error(res, 404, "Category not found")
            return;
        }
        send_data.CategoryId = categoryInfo.dataValues.id
        const data = await newsServices.createPost(res,send_data)
        console.log("Data posted successfully")
        Response.success(res,data,"News posted successfully")
    } 
    catch (error) {
        Response.error(res,error?.status || 500 , error?.message)
        return
    }
}

const getCategory = async (news_body) => {
    const newFormData = new FormData()
    newFormData.append("news", news_body)
    const data = await axios({
        method: "post",
        url: "http://127.0.0.1:5000/classifynews",
        data: newFormData,
        headers: { "Content-Type": "multipart/form-data" },
    })
    if (data){
        return data.data.predictions[0]
    }
}

exports.getPost = async(req,res) => {
    try {
        const {query} = req;
        const category = query.category;
        const data = await newsServices.getPost(category);
        Response.success(res,data,"News get successful")
    } 
    catch (error) {
        Response.error(res,error?.status || 500 , error?.message)
        return
    }
}

exports.getOneNews = async(req,res) => {
    try {
        // const {params} = req;
        const news_id = req.params.news_id;
        const data = await newsServices.getOneNews(news_id);
        Response.success(res, data, "News got successfully")
    } catch(error) {
        Response.error(res,error?.status || 500 , error?.message)
        return
    }
}

exports.editPost = async(req,res) => {
    try {
        const {query} = req;
        const {body} = req;
        const change_id = query.change_id;
        const send_data = {
            source : body.source,
            news_body : body.news_body,
            news_class : body.news_class
        }
        const data = await newsServices.editPost(res,change_id,send_data)
        if(data == false) return
        Response.success(res,data,"News edited successfully")
    } 
    catch (error) {
        Response.error(res,error?.status || 500 , error?.message)
        return
    }
}

exports.deletePost = async(req,res) => {
    try {
        const {query} = req;
        const delete_id = query.delete_id;
        const data = await newsServices.deletePost(res,delete_id)
        if(data == false) return
        Response.success(res,data,"News deleted successfully");
    } 
    catch (error) {
        Response.error(res,error?.status || 500 , error?.message)
        return
    }
}

exports.uploadProfilePicture = async (req,res) => {
    try {
        const change_id = req.query.change_id;
        console.log(change_id);
        const send_data = {
            photo: req.file?.filename
        }
        const data = await newsServices.editPost(res, change_id, send_data);
        Response.success(res, data, "Photo uploaded successfully"); 
    }
    catch (error) {
        Response.error(res,error?.status || 500 , error?.message)
        return;
    }
}