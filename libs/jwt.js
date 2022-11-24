const jwt = require("jsonwebtoken");

const createToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "7 days",
    });
    return token;
};

const verifyToken = (token) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return payload;
};

module.exports = {
    createToken,
    verifyToken,
};
