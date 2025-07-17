import express from "express";
import { getuser, loginuser, registereduser } from "../controller/userController.js";
import protect from "../Middleware/auth.js";
const userrouter=express.Router();

userrouter.post('/register',registereduser);
userrouter.post('/login',loginuser);
userrouter.get('/data',protect,getuser);


export default userrouter;

