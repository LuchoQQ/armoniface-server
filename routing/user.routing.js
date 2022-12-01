const express = require("express");
const {
    getAllUsersFromDB,
    createUser,
    getUserById,
    deleteUserFromDB,
    validateUser,
    addCourseToUser,
    getCoursesOfUserById,
    deleteCourseFromUser
} = require("../controllers/user.controller");
const User = require("../models/User");
const router = express.Router();

router.get("/", getAllUsersFromDB);

router.get("/:id", getUserById);

router.post("/", createUser);

router.delete("/:id", deleteUserFromDB);

router.post("/auth", validateUser);

// user and courses relationship

router.get("/courses/:id", getCoursesOfUserById);

router.post("/courses", addCourseToUser);

router.delete("/courses/:id/:courseId", deleteCourseFromUser);


router.post("/admin", (req, res) => {
    res.status(200).json({ auth: true });
});

module.exports = router;
