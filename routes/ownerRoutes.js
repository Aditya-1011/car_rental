import express from "express";
import protect from "../Middleware/auth.js";
import { addcar, changerole } from "../controller/ownerController.js";
import upload from "../Middleware/multer.js";

const ownerRouter=express.Router();

console.log("inside ownerrouter");



ownerRouter.post("/change-role",protect,changerole);
ownerRouter.post("/test-add", upload.single("image"), async (req, res) => {
  console.log("Inside test-add route");
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  res.json({ success: true, message: "Test route hit" });
});

ownerRouter.post("/add-car",upload.single("image"),addcar);
// router.post("/add-car", upload.single("image"), addcar); 

// ownerRouter.post('/add-car',(req,res,next)=>{
//     console.log("inside owner-router");
// },addcar);

export default ownerRouter;
