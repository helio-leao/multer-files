import express from "express";
import diskStorageRouter from "./routes/diskStorage.js";
import memoryStorageRouter from "./routes/memoryStorage.js";
import fs from "fs/promises";
import path from "path";
import { FILES_DIRECTORY } from "./constants/fileConstants.js";

const __dirname = path.resolve();

const app = express();
app.use(express.json());

await fs.mkdir(FILES_DIRECTORY, { recursive: true });

app.use("/disk", diskStorageRouter);
app.use("/memo", memoryStorageRouter);

// list of files on uploads directory
app.get("/", async (_req, res) => {
  try {
    const files = await fs.readdir(FILES_DIRECTORY);
    res.json(files);
  } catch {
    res.sendStatus(500);
  }
});

// gets a file by name
app.get("/:fileName", async (req, res) => {
  const { fileName } = req.params;

  try {
    res.sendFile(path.join(__dirname, FILES_DIRECTORY, fileName));
  } catch {
    res.sendStatus(500);
  }
});

// delete a file by name
app.delete("/:fileName", async (req, res) => {
  const { fileName } = req.params;

  try {
    await fs.unlink(path.join(__dirname, FILES_DIRECTORY, fileName));
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("Server running..."));
