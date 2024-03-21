const User = require("../datalayer/User");
const Response = require("../utils/Response");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.register = async (res, send_data) => {
    try {
        const checkEmail = await User.validateEmail(send_data.email)
        if (checkEmail) {
            Response.error(res, 401, "Email already taken")
            return false
        }
        const data = await User.register(send_data)
        return data
    }
    catch (error) {
        throw error
    }
}

exports.login = async (res, send_data) => {
    try {
        const validateEmail = await User.validateEmail(send_data.email)
        if (!validateEmail) {
            Response.error(res, 404, "No email found")
            return false
        }
        if (validateEmail.status != "active") {
            Response.error(res, 401, "The email is deleted")
            return false
        }
        const validatePassword = bcryptjs.compare(send_data.password, validateEmail.password);
        if (validatePassword == false) {
            Response.error(res, 401, "Invalid Password");
            return false
        }
        const token = jwt.sign({ id: validateEmail.id }, "MajorProjects");
        return token
    }
    catch (error) {
        throw error
    }
}

exports.getUser = async () => {
    try {
        const data = await User.getUser();
        return data
    }
    catch (error) {
        throw error
    }
}

exports.getProfile = async (user_email) => {
    try {
        const data = await User.getProfile(user_email);
        return data
    }
    catch (error) {
        throw error
    }
}

exports.deleteUser = async (res, email) => {
    try {
        const validateEmail = await User.validateEmail(email)
        if (!validateEmail) {
            Response.error(res, 404, "No user found");
            return false
        }
        const data = await User.deleteUser(email);
        return data
    }
    catch (error) {
        throw error
    }
}

exports.editProfile = async (user_email, send_data) => {
    try {
        const data = await User.editProfile(user_email, send_data)
        return data
    }
    catch (error) {

    }
}

exports.logout = async (req, res) => {
    try {
        // Implement logout functionality, such as invalidating the token
        // For simplicity, let's assume the token is stateless and doesn't need explicit logout
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        Response.error(res, error?.status || 500, error?.message)
        return
    }
}
