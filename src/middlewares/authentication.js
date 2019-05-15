const jwt = require("jsonwebtoken"),
    { tokens } = require("../config/infoConfig");

const Authentication = {};

Authentication.isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            success: false,
            message: "Forbidden access token not provided"
        });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (token) {
        jwt.verify(token, tokens.USER_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    succes: false,
                    message: "Failed authentication token does not exist"
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    }
}