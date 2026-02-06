process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION:", err.stack);
});

process.on("unhandledRejection", (reason) => {
  console.log("UNHANDLED REJECTION:", reason);
});

import "dotenv/config";
import cors from "cors";
import express from "express";
import newBlogSub from "./utils/sub.js";
import streamRouter from "./routes/streamRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use(express.json());

newBlogSub();

app.use("/api/v1", streamRouter);

app.get("/health", async (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use(async (_req, res) => {
  res.status(400).json({ message: "Bad Request" });
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
