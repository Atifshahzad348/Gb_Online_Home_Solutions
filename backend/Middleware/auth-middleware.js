const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async(req, res, next)=>{
 const token = req.header("authorization");
// router.use(authMiddleware);

if(!token){
    return res
    .status(401)
    .json({msg: "Unauthorized HTTP, Token is not provided"})
}

// Assuming token is in the foramat "Barear", <jwt TOken>, removing the "Barear" prefix
 const jwtToken = token.replace('Bearer', "").trim();
 try {
    const isVarified = jwt.verify(jwtToken, process.env.jwtSecretKey);

    const userData = await User.findOne({email: isVarified.email}).select({password:0});

    req.user = userData;
    req.token= token;
    req.userID = userData._id;


    next();
 } catch (error) {
    return res.status(401).json({msg: "Unauthorized, invalid token."})
 }
}

module.exports = authMiddleware;



