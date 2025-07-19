import express from "express";
import protect from "../Middleware/auth.js";
import { addcar, changerole } from "../controller/ownerController.js";
import upload from "../Middleware/multer.js";

const ownerRouter=express.Router();

// console.log("inside ownerrouter");
ownerRouter.post("/change-role",protect,changerole);
// ownerRouter.post("/add-car",protect,upload.single("image"),addcar);

ownerRouter.post('/add-car',(req,res,next)=>{
    console.log("inside owner-router");
},addcar);

export default ownerRouter;
