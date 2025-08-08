import fs from "fs";
import Car from "../model/Car.js";
import User from "../model/User.js";
import imagekit from "../configs/imagekits.js";

// Change user role to 'owner'
export const changerole = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { role: "owner" });
    res.json({ success: true, message: "Now you can list cars" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
 
// Add a new car listing

// export const addcar = async (req, res) => {
//     console.log("req.body:", req.body);
//     console.log("req.file:", req.file);

//      console.log("Request received:", req.file, req.body);
    
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "No image uploaded" });
//     }
    
//     if (!req.body.carData) {
//       return res.status(400).json({ success: false, message: "No car data provided" });
//     }

   
//   try {
//     const { _id } = req.user;
//     const car = JSON.parse(req.body.carData);
//     const imagefile = req.file; 

//     if (!car || !imagefile) {
//       return res.status(400).json({ success: false, message: "Missing car data or image" });
//     }

//     // Read file buffer
//     const filebuffer = fs.readFileSync(imagefile.path);

//     // Upload to ImageKit
//     const response = await imagekit.upload({
//       file: filebuffer,
//       fileName: imagefile.originalname,
//       folder: '/cars'
//     });

//     // Generate compressed URL
//     const imageURL = imagekit.url({
//       path: response.filePath,
//       transformation: [
//         { width: '1280' },
//         { quality: 'auto' },
//         { format: 'webp' },
//       ],
//     });

//     // Create car entry

//     const image=imageURL;
//     const newCar = await Car.create({
//       ...car,
//       owner: _id,
//       image
//     });

//     res.json({ success: true, message: "car added" });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ success: false, message: "Something went wrong" });
//   }
// };
export const addcar = async (req, res) => {
  console.log("========== Incoming Request ==========");
  console.log("Headers:", req.headers);
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);
  console.log("req.body.carData (raw):", req.body.carData);
  console.log("======================================");

  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image uploaded" });
  }

  if (!req.body.carData) {
    return res.status(400).json({ success: false, message: "No car data provided" });
  }

  try {
    const { _id } = req.user;

    const car = JSON.parse(req.body.carData);
    const image = "https://dummyimage.com/600x400/000/fff";

    const newCar = await Car.create({
      ...car,
      owner: _id,
      image
    });

    res.json({ success: true, message: "Car added without imagekit" });
  } catch (error) {
    console.error("🔥 Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
