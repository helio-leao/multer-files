import { Router } from "express";
import fs from "fs/promises";
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

router.post("/fromBase64", async (req, res) => {
  const { base64, name, mimeType } = req.body;
  const filePath = path.join(__dirname, "uploads", name);
  const buffer = Buffer.from(base64, "base64");
  await fs.writeFile(filePath, buffer);
  res.sendFile(filePath);
});

export default router;
