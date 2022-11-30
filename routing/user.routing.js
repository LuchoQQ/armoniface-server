const express = require("express");
const {
    getAllUsersFromDB,
    createUser,
    getUserById,
    deleteUserFromDB,
    validateUser,
    authAdmin,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getAllUsersFromDB);

router.get("/:id", getUserById);

router.post("/", createUser);

router.delete("/:id", deleteUserFromDB);

router.post("/auth", validateUser);

router.post("/admin", (req, res) => {
    res.status(200).json({ auth: true });
});

module.exports = router;
