import { Service } from "../models/service.model.js";

export const services  = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response){     
        res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json({msg: response });
    } catch (error) {
        console.log("services error: ", error);
        
    }
}