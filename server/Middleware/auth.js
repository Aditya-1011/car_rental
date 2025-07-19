// import jwt from "jsonwebtoken";
// import User from "../model/User.js";

// const protect = async (req, res, next) => { 
//   const token = req.headers.authorization;
//   console.log(token);
    
//   if (!token) {
//     return res.json({ success: false, message: "not authorized" });
//   }

//   try {
//     // Verify token
//     const decoded = jwt.decode(token, process.env.JWT_SECRET);

//     // c 
 
//     // If your token was signed as jwt.sign(userId, secret)
//     // const userId = decoded;

//     // If your token was signed as jwt.sign({ id: userId }, secret)
//     // const userId = decoded.id;
//     if(!decoded){
//         return res.json({ success: false, message: "notttt authorized" });


//     } 

//     req.user = await User.findById(decoded).select("-password");
//     // if (!req.user) {
//     //   return res.json({ success: false, message: "not authorized" });
//     // }

//     next();
//   } catch (error) {
//     return res.json({ success: false, message: "not authorized whyyyyyyy" });
//   }
// };

// export default protect;


import jwt from "jsonwebtoken";
import User from "../model/User.js";

const protect = async (req, res, next) => {
  let token;
  
  // Get token from header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.headers.authorization) {
    token = req.headers.authorization;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided"
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user and attach to request
    req.user = await User.findById(decoded.userId).select("-password");
    
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
      error: error.message
    });
  }
};

export default protect;