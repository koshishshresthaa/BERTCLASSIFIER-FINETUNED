const News = require("../datalayer/News")
const Response = require("../utils/Response")

exports.createPost = async(res,send_data) => {
    try {
        const data = await News.createPost(send_data);
        return data
    } 
    catch (error) {
        throw error
    }
}

exports.getPost = async(category) => {
    try {
        const data = await News.getPost(category);
        return data
    } 
    catch (error) {
        throw error
    }
}

exports.getOneNews = async(news_id) => {
    try {
        const data = await News.getOneNews(news_id);
        return data
    } 
    catch (error) {
        throw error
    }
}

exports.editPost = async(res,change_id,send_data) => {
    try {
        const validateNews = await News.validateID(change_id)
        if(!validateNews){
            Response.error(res,404,"No News Found")
            return false
        }
        const data = await News.editPost(change_id,send_data)
        return data
    } 
    catch (error) {
        throw error
    }
}

exports.deletePost = async(res,delete_id) => {
    try {
        const validateNews = await News.validateID(delete_id)
        if(!validateNews){
            Response.error(res,404,"No News Found")
            return false
        }
        const data = await News.deletePost(delete_id)
        return data
    } 
    catch (error) {
        throw error
    }
}