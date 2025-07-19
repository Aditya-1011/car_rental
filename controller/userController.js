import User from "../model/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Generate jwt token
const generate = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

export const registereduser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || !password.length)
      return res.json({ success: false, message: "Fill all the fields" }); 

    const userexists = await User.findOne({ email });
    if (userexists) return res.json({ success: false, message: "User already exists" });

    const hashedpassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedpassword });

    const token = generate(newUser._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: "Invalid credentials" });

    const token = generate(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};


export const getuser=async(req,res)=>{
    try {
      console.log("Inside getuser controller");

        const {user}=req;
        res.json({success:true,user});
        console.log("user is fine");
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
        
    }
}

// export const getuser