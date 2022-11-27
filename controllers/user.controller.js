const { hashPassword, comparePassword } = require("../libs/bcrypt");
const { createToken, verifyToken } = require("../libs/jwt");
const User = require("../models/User");

const getAllUsersFromDB = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password: await hashPassword(password),
        });
        const token = createToken({ id: user._id });
        res.status(201).json({
            status: "ok",
            message: "user created sucessfull",
            token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUserFromDB = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        res.status(200).json({
            status: "ok",
            message: "user deleted sucessfull",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// validate

const validateUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({
            email,
        });
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "user not found",
            });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                status: "error",
                message: "invalid password",
            });
        }
        const token = createToken({ id: user._id });
        res.status(200).json({
            status: "ok",
            id: user._id,
            name: user.name,
            email: user.email,
            courses: user.courses,
            role: user.role,
            avatar: user.avatar,
            createdAt: user.createdAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserByToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            status: "error",
            message: "unauthorized",
        });
    }
    const token = authorization.split(" ")[1];
    try {
        const payload = verifyToken(token);
        const user = await User.findById(payload.id);
        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "unauthorized",
            });
        }
        req.user = user;
        return res.status(200).json({
            status: "ok",
            user,
            message: "user authorized",
        });
    } catch (error) {
        res.status(401).json({
            status: "error",
            message: "unauthorized",
        });
    }
};

module.exports = {
    getAllUsersFromDB,
    createUser,
    getUserById,
    deleteUserFromDB,
    validateUser,
    getUserByToken,
};
