const express = require("express");
const {
    getAllUsersFromDB,
    createUser,
    getUserById,
    deleteUserFromDB,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getAllUsersFromDB);

router.get("/:id", getUserById);

router.post("/", createUser);

router.delete("/:id", deleteUserFromDB);

module.exports = router;
