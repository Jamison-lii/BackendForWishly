import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    let folder = "cards";
    let resource_type = "image";

    // ✅ handle MP3 and other audio files
    if (file.fieldname === "song") {
      resource_type = "auto"; // let Cloudinary detect (audio/video)
      folder = "songs";
    }

    return {
      folder,
      resource_type,
      public_id: file.originalname.split(".")[0],
   //   format: file.mimetype.split("/")[1],
    };
  },
});

const upload = multer({ storage });
export default upload;
