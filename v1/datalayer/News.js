const {News} = require("../model/News")
const {Category}  = require("../model/Category")
const { User } = require("../model/User")

exports.createPost = async(send_data) => {
    try {
        const data = await News.create(send_data);
        return data
    } 
    catch (error) {
        throw error
    }
}

exports.getPost = async(category) => {
    try {
        let searchSchema = {status : "active"}
        let limit = 6
        if(category){
            searchSchema.news_class = category
            limit = 1000000
        }
        const data = await News.findAll({
            include: [Category, User],
            where: searchSchema,
            limit: limit,
            offset: 0,
            order: [["updatedAt", "DESC"]]
        })
        return data
    } 
    catch (error) {
        throw error
    }
}

exports.getOneNews = async(news_id) => {
    try {
        let searchSchema = {status : "active"}
        searchSchema.id = news_id
    
        const data = await News.findOne({
            include: [Category, User],
            where: searchSchema
        })
        return data
    } 
    catch (error) {
        throw error
    }
}

exports.editPost = async(change_id,send_data) => {
    try {
        const data = await News.update(
            {
                source : send_data.source,
                news_body : send_data.news_body,
                news_class : send_data.news_class,
                photo: send_data.photo
            },
            {
                where : {id : change_id}
            }
        )
        return data
    } 
    catch (error) {
        throw error
    }
}

exports.deletePost = async(delete_id) => {
    try {
        const data = await News.update(
            {
                status : "deleted"
            },
            {
                where : {id : delete_id}
            }
        )
        return data
    } 
    catch (error) {
        throw error
    }
}

exports.validateID = async(id) => {
    try {
        const data = await News.findOne({
            where : {id : id}
        })
        return data
    } 
    catch (error) {
        throw error    
    }
}