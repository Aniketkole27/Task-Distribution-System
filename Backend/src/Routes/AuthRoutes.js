import express from "express";
import {loginValidation,signUpValidation} from "../MiddleWare/AuthValidation.js"; 
import {login,register} from "../Controller/AuthController.js"

export const authRoute = express.Router();

authRoute.post("/login",loginValidation,login);
authRoute.post("/signup",signUpValidation,register);