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

    const userid=decoded.userid;

    // c 
 
    // If your token was signed as jwt.sign(userId, secret)
    // const userId = decoded;

    // If your token was signed as jwt.sign({ id: userId }, secret)
    // const userId = decoded.id;
    if(!decoded){
        return res.json({ success: false, message: "notttt authorized" });


    } 

    req.user = await User.findById(userid).select("-password");
    // if (!req.user) {
    //   return res.json({ success: false, message: "not authorized" });
    // }

    next();
  } catch (error) {
    return res.json({ success: false, message: "not authorized whyyyyyyy" });
  }
};

export default protect;


