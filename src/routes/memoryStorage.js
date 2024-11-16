import { Router } from "express";
import fs from "node:fs/promises";
import multer from "multer";
import path from "path";

const __dirname = path.resolve();
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("picture"), (req, res) => {
  res.json(req.file);
});

router.post("/toDisk", upload.single("picture"), async (req, res) => {
  const { file } = req;
  const filePath = path.join(__dirname, "uploads", file.originalname);
  await fs.writeFile(filePath, file.buffer);
  res.sendFile(filePath);
});

router.post("/toBase64", upload.single("picture"), (req, res) => {
  const { file } = req;
  const base64 = file.buffer.toString("base64");
  res.send(`data:${file.mimetype};base64,${base64}`);
});

export default router;
