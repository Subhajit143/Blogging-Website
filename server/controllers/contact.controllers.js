import { Contact } from "../models/contact.model.js";


const contact = async (req, res) =>{
    try {
        const response=req.body
        await Contact.create(response)
        return res.status(200).json({message: "Message Send Succesfully" })
    } catch (error) {
        return res.status(500).json({message: "Message not delivered" })
    }
}

export { contact }  //This function will be used in routes/contact.routes.js file to get contact form data.  //This function is used to save contact form data in database.  //This function is used to send email to admin when new contact form data is submitted.  //This function is used to delete contact form data from database.  //This function is used to update contact form data in database.  //This function is used to get all contact form data

