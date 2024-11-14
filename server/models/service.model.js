import { Schema,model } from "mongoose";

const serviScema= new Schema({
    service:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    provider:{
        type:String,
        required:true
    }
})

export const Service= new model('Service',serviScema)
