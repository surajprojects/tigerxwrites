import "dotenv/config";
import { createClient, RedisClientType } from "redis";

declare global {
  // prevent multiple clients in dev
  var redisClient: RedisClientType | undefined;
}

const redisUrl = process.env.REDIS_URL!;

export const redisClient: RedisClientType =
  global.redisClient ??
  createClient({
    url: redisUrl,
  });

if (!global.redisClient) {
  redisClient.on("error", (err) => {
    console.error("Redis Client Error", err);
  });

  redisClient.on("connect", () => {
    console.log("Redis connected");
  });

  redisClient.connect();
}

if (process.env.NODE_ENV !== "production") {
  global.redisClient = redisClient;
}
