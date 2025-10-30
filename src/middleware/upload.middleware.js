import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";
import { v4 as uuidv4 } from 'uuid';


const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "cards";
    let resource_type = "image";

    if (file.fieldname === "song") {
      resource_type = "auto"; // Cloudinary detects type automatically
      folder = "songs";
    }

   return {
      folder,
      resource_type,
      public_id: `${file.originalname.split(".")[0]}_${uuidv4()}`, // unique ID
    };
  },
});

const upload = multer({ storage });
export default upload;
