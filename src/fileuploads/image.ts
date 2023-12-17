import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/home/sky/Desktop/yamini-demo-2/src/public");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000000,
  },
});

export default upload;
