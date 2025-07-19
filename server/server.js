import dotenv from "dotenv"
dotenv.config();
import express from "express"

import cors from "cors"

import connectDB from "./configs/db.js";
import userrouter from "./routes/userRoutes.js";

//express app
const app=express();




app.use(cors());
app.use(express.json());

console.log(process.env.MONGODB_URL);

app.use((req, res, next) => {
  console.log("running --- > ");
  console.log(`${req.method} ${req.url}`);
  next();
});

//connnect DATABASE
await connectDB();
app.get('/',(req,res)=>{
    res.send("server is running fine");

});
console.log("WHY IT IS NOR RENDERING "+process.env.JWT_SECRET
    
);


app.use('/api/user',userrouter);
const PORT=process.env.PORT || 3000;

// START EXPRESS SERVER
app.listen(PORT,()=>{
    console.log(`server runnning at ${PORT}`)

})


