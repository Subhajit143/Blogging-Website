import express from "express";
import { home , register,login,user } from "../controllers/auth.controllers.js";
import { signupSchema} from "../validators/auth.validators.js";
import { loginSchema } from "../validators/auth.validators.js";
import { validate } from "../middleware/validate.middleware.js";
import {authmiddleware} from "../middleware/auth.middleware.js";


const router= express.Router();

router.get("/",home)
// router.post("/register",validate(signupSchema),register)
router.route("/register").post(validate(signupSchema),register);
// router.post("/postuser",postuser)
// router.post("/login",login)
router.route("/login").post(validate(loginSchema),login);


router.route("/users").get(authmiddleware,user)




export {router}