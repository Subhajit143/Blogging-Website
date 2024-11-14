


const adminMiddleware=async(req,res,next) => {
    try {
       // this req.user is directly accessible from auth-middleware.js
       //
        console.log(req.user); 
        const adminRole=req.user.isAdmin;
        if(!adminRole){
            return res.status(403).json({message: "Access denied, User not admin"})
        }
    //    res.status(200).json({msg: req.user.isAdmin});

    //if  user is an admin, proceed to the next middleware
        next()
    } catch (error) {
        next(error);
    }
}

export {adminMiddleware}