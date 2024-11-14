import express from "express";
import { contact } from "../controllers/contact.controllers.js";



const contactRouter= express.Router();


contactRouter.route("/contact").post(contact);




export {contactRouter}