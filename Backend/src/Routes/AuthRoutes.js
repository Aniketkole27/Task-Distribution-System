import express from "express";
import { loginValidation, signUpValidation } from "../MiddleWare/AuthValidation.js";
import { ensureAuthenticated } from "../MiddleWare/Auth.js";
import { handleUserLogin, handleUserRegister, handleUserLogout, handleGetUserProfile,handleGetAllUsers } from "../Controller/AuthController.js"

export const authRoute = express.Router();

authRoute.post("/login", loginValidation, handleUserLogin);
authRoute.post("/signup", signUpValidation, handleUserRegister);
authRoute.post("/logout", ensureAuthenticated, signUpValidation, handleUserLogout);

authRoute.get("/users/", ensureAuthenticated, handleGetAllUsers)

authRoute.get("/profile/:id", signUpValidation, handleGetUserProfile);