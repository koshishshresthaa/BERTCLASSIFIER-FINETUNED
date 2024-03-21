const jwt = require('jsonwebtoken');
const Response = require("../utils/Response")
const {User} = require("../model/User")

exports.authGuard = async(req,res,next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if(!token){
            Response.error(res,401,"No token found")
            return
        }
        const data = jwt.verify(token,"MajorProjects");
        if(!data){
            Response.error(res,403,"Unverifiable Token")
            return
        }
        const userData = await User.findOne({
            where : {id : data.id}
        })
        if(userData){
            req.user = userData
            next();
        }
        else{
            Response.error(res,404,"User not found")
            return
        }
    } 
    catch (error) {
        throw error    
    }
}