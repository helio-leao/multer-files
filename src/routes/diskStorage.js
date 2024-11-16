import { Router } from "express";
import multer from "multer";
import path from "path";

const router = Router();
const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("picture"), (req, res) => {
  const { file } = req;
  res.sendFile(path.join(__dirname, file.path));
});

export default router;
