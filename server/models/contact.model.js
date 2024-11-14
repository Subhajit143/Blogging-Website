import {Schema,model} from "mongoose"

const contactSchema=new Schema({
    username: {type:String , required:true},
    email: {type:String , required:true},
    message: {type:String , required:true},
    
})

//create model or a collection
const Contact =new model('Contact',contactSchema)
export {Contact}


