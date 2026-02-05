import "dotenv/config";
import { Redis } from "@upstash/redis";
import { PrismaClient } from "../../../backend/prisma/generated/prisma/client.js";

// Prisma Instance
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Redis Instance
declare global {
  var redisClient: Redis | undefined;
}

export const redis =
  global.redisClient ??
  new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

if (process.env.NODE_ENV !== "production") {
  global.redisClient = redis;
}
