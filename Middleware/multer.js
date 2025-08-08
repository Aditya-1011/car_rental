
import multer from "multer";
const upload=multer({storage:multer.diskStorage({})});
console.log("multerrr")
export default upload;
