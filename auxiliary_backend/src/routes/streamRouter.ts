import express, { Router } from "express";
import { inMemoryUserManager } from "../utils/userManager.js";

const streamRouter: Router = express.Router();

streamRouter.post("/stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  res.write(":\n\n"); // heartbeat

  inMemoryUserManager.addUser(res);

  const intervalId = setInterval(() => {
    inMemoryUserManager.heartBeat();
  }, 15000);

  res.on("close", () => {
    inMemoryUserManager.removeUser(res);
    clearInterval(intervalId);
  });
});

export default streamRouter;
