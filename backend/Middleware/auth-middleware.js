



// test code

const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async(req, res, next) => {
    const token = req.header("authorization");
    
    if(!token){
        return res.status(401).json({msg: "Unauthorized HTTP, Token is not provided"});
    }

    // Assuming token is in the format "Bearer <jwt Token>", removing the "Bearer" prefix
    const jwtToken = token.replace('Bearer', "").trim();
    
    try {
        const isVerified = jwt.verify(jwtToken, process.env.jwtSecretKey);
        const userData = await User.findOne({email: isVerified.email}).select({password:0});

        req.user = userData;
        req.token = token;
        req.userID = userData._id;

        // UPDATE LAST ACTIVE TIMESTAMP ON EACH REQUEST
        await User.findByIdAndUpdate(userData._id, {
            lastActive: new Date()
        });

        next();
    } catch (error) {
        return res.status(401).json({msg: "Unauthorized, invalid token."});
    }
};

module.exports = authMiddleware;

