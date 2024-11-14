import mongoose from  "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    phone : {
        type: String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
})
//secure password using Bcrypt
userSchema.pre('save', async function(next){
const user=this;
if(!user.isModified('password')){
   next(); 
}
try {
    const saltRound=10;
    const hash_password= await bcrypt.hash(user.password,saltRound)
    user.password=hash_password;
} catch (error) {
    next(error)
}
 
})

//compare password

userSchema.methods.comparePassword=async function(password){
    try {
        return await bcrypt.compare(password,this.password);
    } catch (error) {
        console.log(error);
        
    }
}


//Json web Token -- JWT dont Store in DATABASE Store only in client side server or JWT
userSchema.methods.generateToken= async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin:this.isAdmin,
        },
        process.env.JWT,{
            expiresIn:"30d"
        }
    
    );
    } catch (error) {
        console.log(error);
        
    }
}
//define the Model or the collection name
const User=new mongoose.model("User",userSchema)
export {User}