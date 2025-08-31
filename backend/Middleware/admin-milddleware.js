const adminMiddleware = async (req, res, next) =>{
    try {
        // console.log(req.user);
        const adminRole = req.user.is_admin;
        if(!adminRole){
            return res
            .status(403)
            .json({msg: "Access dinied. User is not a admin"});
        }
        // res.status(200).json({msg: req.user.is_admin});
        
        //if user is admin then proceed to next middleware
        next();
    } catch (error) {
     next(error);   
    }

}

module.exports= adminMiddleware;