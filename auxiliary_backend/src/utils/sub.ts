import { redis } from "./db.js";
import { inMemoryUserManager } from "./userManager.js";
import { Blog } from "../../../backend/prisma/generated/prisma/index.js";

type NewBlogMessage = {
  blogData: Blog;
};

export default function newBlogSub() {
  const newBlogSub = redis.subscribe("newBlog");

  newBlogSub.on("message", (data) => {
    const msg = data.message as NewBlogMessage;
    inMemoryUserManager.broadcast(JSON.stringify(msg.blogData));
  });
}
