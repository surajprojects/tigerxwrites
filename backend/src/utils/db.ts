import { MyContext } from "./init";
import { Redis } from "@upstash/redis/cloudflare";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../../prisma/generated/prisma/edge";

/**
 * Initialize Prisma client for the current request
 * - Uses DATABASE_URL from Hono context bindings
 * - Extends Prisma with Accelerate for edge-optimized queries
 */
export function initPrisma(c: MyContext) {
    return new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
};

export function initRedis(c: MyContext) {
    return new Redis({
        url: c.env.UPSTASH_REDIS_REST_URL,
        token: c.env.UPSTASH_REDIS_REST_TOKEN,
    });
};