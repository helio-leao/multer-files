import express from "express";
import indexRouter from "./routes/index.js";
import diskStorageRouter from "./routes/diskStorage.js";
import memoryStorageRouter from "./routes/memoryStorage.js";
import fs from "fs/promises";
import { FILES_DIRECTORY } from "./constants/fileConstants.js";

const app = express();
app.use(express.json());

await fs.mkdir(FILES_DIRECTORY, { recursive: true });

app.use("/", indexRouter);
app.use("/disk", diskStorageRouter);
app.use("/memo", memoryStorageRouter);

app.listen(3000, () => console.log("Server running..."));
