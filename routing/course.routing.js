const express = require("express");
const Course = require("../models/Course");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const courses = await Course.find();
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get('/:id' , async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});


router.post("/", async (req, res) => {
    const { title, url, description } = req.body;
    try {
        const course = await Course.create({
            title,
            url,
            description,
        });
        return res.status(201).json({
            status: "ok",
            message: "user created sucessfull",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

router.post("/", async (req, res) => {
    const { id } = req.params;
    try {
        const course = await Course.findById(id);
        if (course === null)
            return res.status(404).json({ message: "Course not found" });
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put("/", async (req, res) => {
    const { title, url, description } = req.body;
    try {
        const course = await Course.findOneAndUpdate({
            title,
            url,
            description,
        });
        return res.status(201).json({
            status: "ok",
            message: "user updated sucessfull",
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;
