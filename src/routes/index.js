import { Router } from "express";
import fs from "fs/promises";
import path from "path";
import { FILES_DIRECTORY } from "../constants/fileConstants.js";

const router = Router();

// list of files on uploads directory
router.get("/", async (_req, res) => {
  try {
    const files = await fs.readdir(FILES_DIRECTORY);
    res.json(files);
  } catch {
    res.sendStatus(500);
  }
});

// gets a file by name
router.get("/:fileName", async (req, res) => {
  const { fileName } = req.params;

  try {
    res.sendFile(path.resolve(FILES_DIRECTORY, fileName));
  } catch {
    res.sendStatus(500);
  }
});

// delete a file by name
router.delete("/:fileName", async (req, res) => {
  const { fileName } = req.params;

  try {
    await fs.unlink(path.join(FILES_DIRECTORY, fileName));
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

export default router;
