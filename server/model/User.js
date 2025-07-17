import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'owner', enum: ["owner", "user"] },
  image: { type: String, default: '' },
}, { timestamps: true });


const user=mongoose.model('User',userSchema);
export default user;