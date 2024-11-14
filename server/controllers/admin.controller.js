import { User } from "../models/user.models.js";
import { Contact } from "../models/contact.model.js";


export const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find({},{password:0}) //password:0 means i want to get all data's without password 
        console.log(users);
        
        if(!users||users.length===0){
            return res.status(404).json({message: "No users found"})
        }
       return res.status(200).json(users)
    } catch (error) {
        next(error);
    }
}
export const getAllContacts=async (req, res) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        if(!contacts || contacts.length === 0){
            return res.status(404).json({message: "No Contacts found"})
        }
        return res.status(200).json(contacts)
        
    } catch (error) {
        next(error);
    }
}


//Single User edit Logic
 export const getUserById = async (req, res) => {
    try {
        const id = req.params.id; // id of the user
        const data =await User.findOne({_id:id},{password:0}); //password:0 means we dont need the password
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        
    }
}

// User Update Logic
export const updateUserById = async (req, res,next) => {
    try {
        const id = req.params.id; // id of the user
        const updatedUserData = req.body;

        const updatedData=await User.updateOne({_id:id},{
            $set: updatedUserData,
        })

        return res.status(200).json(updatedData)
    } catch (error) {
        next(error)
    }
}

// User Delete logic
 export const deleteUserById = async (req,res)=>{
    try {
        const id = req.params.id; // id of the user
        await User.deleteOne({_id:id})
        return res.status(200).json({message: "User deleted successfully"})
    } catch (error) {
        console.log(error);
    }
}

//Contact delete logic

export const deleteContactById = async (req,res)=>{
    try {
        const id = req.params.id;
        await  Contact.deleteOne({_id:id})
        return res.status(200).json({message: "Contact deleted successfully"})
    } catch (error) {
        console.log(error);
        
    }
}