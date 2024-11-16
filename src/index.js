import express from "express";
import diskStorageRouter from "./routes/diskStorage.js";
import memoryStorageRouter from "./routes/memoryStorage.js";

const app = express();
app.use(express.json());

app.use("/disk", diskStorageRouter);
app.use("/memo", memoryStorageRouter);

app.listen(3000, () => console.log("Server running..."));
