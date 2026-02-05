import { redis } from "../utils/db.js";
import express, { Router } from "express";
import { inMemoryUserManager } from "../utils/userManager.js";
import { Blog } from "../../../backend/prisma/generated/prisma/index.js";

const streamRouter: Router = express.Router();

const newBlogSub = redis.subscribe("newBlog");

type NewBlogMessage = {
  blogData: Blog;
};

streamRouter.post("/stream", async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  res.write(":\n\n"); // heartbeat

  inMemoryUserManager.addUser(res);

  newBlogSub.on("message", (data) => {
    const msg = data.message as NewBlogMessage;
    inMemoryUserManager.broadcast(msg.blogData.title);
  });

  res.on("close", () => {
    inMemoryUserManager.removeUser(res);
  });
});

export default streamRouter;
