const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
    try {
        const connec = mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
    console.log(err.message);
});

module.exports = connectDB;
