import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs"
const home= async(req,res)=>{
    try {
        res.status(200).send("Welcome Subhusing router")
    } catch (error) {
        console.log(error);
        
    }
}


//User Register Part
const register= async(req,res)=>{
    try {
      console.log(req.body);
       const {username,phone,email,password}=req.body
       const userexist= await User.findOne({email});
       if (userexist){
        return res.status(400).json({message: "email already exists"})
       }
       //hash the password
    //    const saltRound=10;
    //    const hash_password= await bcrypt.hash(password,saltRound)
       
       const UserCreated=  await User.create({username,phone,email,password})
     res.status(200).json({
        message:"registration Succesfull" ,
        token: await UserCreated.generateToken(),
        userId:UserCreated._id.toString(),
        
        })
    } catch (error) {
        console.log(error);
        
     }
}
// const postuser=async (req,res)=>{
//     try {
//         const {username, phone ,email,password}=req.body
//         const createUserss= await User.create({username,phone,email,password})
//         createUserss.save();
//         // res.status(200).json({data: UserCreated ,token: await UserCreated.generateToken(),userId:UserCreated._id.toString(),})
//         console.log(createUserss.json());
        
//     } catch (error) {
//         console.log(error);
        
//     }
//     }
// }


//User Login Part
const login =async(req,res)=>{
    try {
       const {email,password}=req.body ;

        const userExist=await User.findOne({email});
        console.log(userExist);
        
        if(!userExist){
            return res.status(400).json({message: "Invalid credential"});
        }

        //const user= await bcrypt.compare(password,userExist.password);
        const user=await userExist.comparePassword(password)
        if(user){
            res.status(200).json({
                message:"Login Succesfull" ,
                token: await userExist.generateToken(),
                userId:userExist._id.toString(),
            });
        }else{
          res.status(401).json({message: "Invalid Email or Password"})   
        }

    } catch (error) {
       res.status(500).json("Internal Server Errors BOiii ")
        
    }
}

//to send user data
const user=async(req,res)=>{
    try {
        const userData=req.user;
        console.log(userData);
        return res.status(200).json({userData})
        
    } catch (error) {
        console.log(`error from the user route ${error}`);
        
    }
}


export {home}
export {register}
export {login}
export {user}