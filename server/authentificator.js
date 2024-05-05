const jwt = require("jsonwebtoken");

authentificator = (jwtSecret) => (req, res, next) => {
    const token = req.cookies?.token;
    if (!token){
        next();
    }
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) next();
        req.userData = userData;
    });
    next();
}

module.exports = authentificator;