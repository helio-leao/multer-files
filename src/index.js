import express from "express";
import diskStorageRouter from "./routes/diskStorage.js";
import memoryStorageRouter from "./routes/memoryStorage.js";
import fs from "fs/promises";
import { FILES_DIRECTORY } from "./constants/fileConstants.js";
import path from "path";

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
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// gets a file by name
app.get("/:fileName", async (req, res) => {
  const { fileName } = req.params;

  if (fileName) {
    res.sendFile(path.join(path.resolve(), FILES_DIRECTORY, fileName));
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => console.log("Server running..."));
