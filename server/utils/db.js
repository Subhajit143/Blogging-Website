import mongoose from "mongoose"


const connectDb=async()=>{
    try {
       const connectionInstance= await mongoose.connect(`${process.env.URL}`)
       console.log(`MongoDB Connection Succesfully !! DB HOST ${connectionInstance.connection.host} `);
       
    } catch (error) {
        console.log("MongoDb Connection error ", error);
        process.exit(1)
        
    }
}

export default connectDb;
