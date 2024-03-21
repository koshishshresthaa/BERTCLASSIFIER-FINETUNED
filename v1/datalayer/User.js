const { User } = require("../model/User");

exports.register = async (send_data) => {
    try {
        const data = await User.create(send_data);
        return data;
    } catch (error) {
        throw error;
    }
};

exports.getUserById = async (userId) => {
    try {
        const data = await User.findByPk(userId);
        return data;
    } catch (error) {
        throw error;
    }
};

exports.getUser = async () => {
    try {
        const data = await User.findAll({
            where: { status: "active" },
        });
        return data;
    } catch (error) {
        throw error;
    }
};

exports.getProfile = async (user_email) => {
    try {
        const data = await User.findOne({
            where: { email: user_email },
        });
        return data;
    } catch (error) {
        throw error;
    }
};

exports.deleteUser = async (email) => {
    try {
        const data = await User.update(
            {
                status: "deleted",
            },
            {
                where: {
                    email: email,
                },
            }
        );
        return data;
    } catch (error) {
        throw error;
    }
};

exports.editProfile = async (user_email, send_data) => {
    try {
        const data = await User.update(
            {
                fullname: send_data.fullname,
                email: send_data.email,
                password: send_data.password,
            },
            {
                where: {
                    email: user_email,
                },
            }
        );
        return data;
    } catch (error) {
        throw error;
    }
};

exports.validateEmail = async (email) => {
    try {
        const data = await User.findOne({
            where: {
                email: email,
            },
        });
        return data;
    } catch (error) {
        throw error;
    }
};
