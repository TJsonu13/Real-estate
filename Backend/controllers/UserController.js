import validator from "validator";
import UserModel from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please enter all details." });
        }
        const hashPassword = bcryptjs.hashSync(password, 10);
        if (!validator.isEmail(email)) { // Check if email is valid
            return res.status(400).json({ success: false, message: "Invalid email address." });
        }
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already registered." });
        }

        const user = await UserModel.create({ name, email, password: hashPassword });
        return res.status(201).json({ success: true, message: "Signup success", user });
    } catch (error) {
        console.error(error);
        next(error);
}};

export const signin = async(req,res,next) =>{
    try {
        const {email,password} = req.body;
        if(!email||!password)
        return res.status(400).json({ success: false, message: "Please enter all details." });

        const user =await UserModel.findOne({email});
        if(!user)
        {
            return res.status(400).json({ success: false, message: "Incorrect email Id." });
        }
        if(user.password!==password)
        {
            return res.status(400).json({ success: false, message: "Incorrect password." });
        }
        return res.status(200).json({ success: true, message: "Login successfull." });
    } catch (error) {
        next(errorHandler(500,"meets an error"));
        next(error);
    }
};