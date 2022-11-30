const { hashPassword, comparePassword } = require("../libs/bcrypt");
const { createToken, verifyToken } = require("../libs/jwt");
const User = require("../models/User");

const getAllUsersFromDB = async (req, res) => {
    try {
        const users = await User.find().select({
            name: 1,
            email: 1,
            role: 1,
            avatar: 1,
            createdAt: 1,
        });
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
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

// create next function to validate admin

module.exports = {
    getAllUsersFromDB,
    createUser,
    getUserById,
    deleteUserFromDB,
    validateUser,
};
