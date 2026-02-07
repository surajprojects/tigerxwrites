import { redisClient } from "./redis.js";
import { Blog } from "../../../backend/prisma/generated/prisma/index.js";
import { inMemoryUserManager } from "./userManager.js";

type NewBlogMessage = {
  blogData: Blog;
};

let isSubscribed = false;

export default async function newBlogSub() {
  if (isSubscribed) return;

  await redisClient.on("ready", () => console.log("Redis subscriber ready"));

  await redisClient.subscribe("newBlog", (message: string) => {
    const blog = JSON.parse(message) as NewBlogMessage;
    inMemoryUserManager.broadcast(JSON.stringify(blog.blogData));
  });

  await redisClient.on("subscribe", (channel) => console.log("Subscribed to", channel));

  isSubscribed = true;
}
