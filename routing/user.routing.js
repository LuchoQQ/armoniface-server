const express = require("express");
const {
    getAllUsersFromDB,
    createUser,
    getUserById,
    deleteUserFromDB,
    validateUser,
    getUserByToken,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getAllUsersFromDB);

router.get("/:id", getUserById);

router.post("/", createUser);

router.delete("/:id", deleteUserFromDB);

router.post("/auth", validateUser);

router.post('/me', getUserByToken);

module.exports = router;
