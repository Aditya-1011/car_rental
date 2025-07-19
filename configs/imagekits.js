import ImageKit from "imagekit";
import dotenv from 'dotenv';
dotenv.config();

// or

// var ImageKit = require("imagekit");
// console.log(process.env.IMAGEKIT_PRIVATEKEY);
var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL
});

export default imagekit;