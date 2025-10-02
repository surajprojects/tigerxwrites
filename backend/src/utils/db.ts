import { MyContext } from "./init";
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