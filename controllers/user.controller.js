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
        const user = await User.create({ name, email, password });
        res.status(201).json({
            status: "ok",
            message: "user created sucessfull",
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



module.exports = {
    getAllUsersFromDB,
    createUser,
    getUserById,
    deleteUserFromDB,
};
