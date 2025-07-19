import express from "express";
import { getuser, loginuser, registereduser } from "../controller/userController.js";
import protect from "../Middleware/auth.js";
const userrouter=express.Router();

console.log("userrouter");
userrouter.post('/register',registereduser);
userrouter.post('/login',(req,res,next)=>{
    console.log("login running");
},loginuser);
// userrouter.get('/data',protect,getuser);
userrouter.get('/data', (req, res, next) => {
  console.log("Inside /api/user/data route BEFORE middleware");
  next();
}, protect, getuser);


export default userrouter;

