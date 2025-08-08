import jwt from "jsonwebtoken";
import User from "../model/User.js";

export const protect = async (req, res, next) => { 
  const token = req.headers.authorization;
  console.log(token);

  console.log("Inside protect middleware");

    
  if (!token) {
    return res.json({ success: false, message: "not authorized" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    

   
    if(!decoded){
        return res.json({ success: false, message: "notttt authorized" });


    } 

    const { id: userId } = decoded;

// then:
req.user = await User.findById(userId).select("-password");
    // if (!req.user) {
    //   return res.json({ success: false, message: "not authorized" });
    // }

    next();
  } catch (error) {
    return res.json({ success: false, message: "not authorized whyyyyyyy" });
  }
};

export default protect;


