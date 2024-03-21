const userServices = require("../services/userServices")
const Response = require("../utils/Response")
const bcryptjs = require('bcryptjs')

exports.register = async(req,res) => {
    try {
        const {body} = req;
        const hashedPassword = await bcryptjs.hash(body.password,10);
        const send_data = {
            fullname : body.fullname,
            email : body.email,
            password : hashedPassword
        }
        const data = await userServices.register(res,send_data)
        if(data == false) return
        Response.success(res,data,"User registerd successfully")
    } 
    catch (error) {
        Response.error(res,error?.status || 500 , error?.message)
        return
    }
}

exports.login = async(req,res) => {
    try {
        const {body} = req;
        const send_data = {
            email : body.email,
            password : body.password
        }
        const data = await userServices.login(res,send_data);
        if(data == false) return
        Response.success(res,data,"Login Successfully")
    } 
    catch (error) {
        Response.error(res,error?.status || 500 , error?.message)
        return
    }
}

exports.getUser = async(req,res) => {
    try {
        const data = await userServices.getUser();
        Response.success(res,data,"User got successfully");
    } 
    catch (error) {
        Response.error(res,error?.status || 500 , error?.message)
        return
    }
}

exports.getProfile = async(req,res) => {
    try {
        const user_email = req.user.email;
        const data = await userServices.getProfile(user_email);
        Response.success(res,data,"User got successfully");
    } 
    catch (error) {
        Response.error(res,error?.status || 500 , error?.message)
        return
    }
}

exports.deleteUser = async(req,res) => {
    try {
        const email  = req.query.email;
        const data = await userServices.deleteUser(res,email);
        if(data == false) return
        Response.success(res,data,"User deleted successfully")
    } 
    catch (error) {
        Response.error(res,error?.status || 500 , error?.message)
        return
    }
}

exports.editProfile = async(req,res) => {
    try {
        const user_email = req.user.email;
        const {body} = req;
        const hashedPassword = await bcryptjs.hash(body.password,10);
        const send_data = {
            fullname : body.fullname,
            email : body.email,
            password : hashedPassword
        }
        const data = await userServices.editProfile(user_email,send_data);
        Response.success(res,data,"User got successfully");
    } 
    catch (error) {
        Response.error(res,error?.status || 500 , error?.message)
        return
    }
}

// userController.js

exports.logout = async (req, res) => {
    try {
      // Clear user session or token here
      // For example, if using JWT, clear the token from client-side storage
      res.clearCookie('token');
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  