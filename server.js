const express = require("express");
const morgan = require("morgan");
const connectDB = require("./libs/mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
// db connection

connectDB();

// middlewares

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

// routing

app.use("/users", require("./routing/user.routing"));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});
