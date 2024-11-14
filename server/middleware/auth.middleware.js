import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"


// this middleware is to verify the token and retrive the data through the token
const authmiddleware=async(req,res,next)=>{
    const token= req.header("Authorization")
    if(!token){
        return res.status(401).json({message: "Access Denied, Token not provided"})
    }
    
    //Assuming token is in  the format "Bearer <jwtToken>, Removing the "bearrer"  prefix
    const jwtToken= token.replace("Bearer", "").trim();
    console.log(("token from auth middleware", jwtToken));

// to get data from data base
    try {
        const isVerified=jwt.verify(jwtToken,process.env.JWT)
       
        const userData=await User.findOne({email: isVerified.email}).
        select({password:0,})
        console.log("userdata = ",userData);
        req.user=userData;
        req.token=token;
        req.userId= userData._id;
      next();   
    } catch (error) {
        return res.status(401).json({message: "Access Denied,Invalid Token."});
    }
   
    
}

export {authmiddleware}