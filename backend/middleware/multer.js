import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid"; // Import UUID library

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/"); // Save files in the "public" folder
  },
  filename: (req, file, cb) => {
    const randomName = uuidv4(); // Generate a unique random ID
    cb(null, `${randomName}${path.extname(file.originalname)}`); // Rename file
  },
});

const upload = multer({ storage: storage });

export default upload;
