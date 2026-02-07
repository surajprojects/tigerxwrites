import "dotenv/config";
import { PrismaClient } from "../../../backend/prisma/generated/prisma/client.js";

// Prisma Instance
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
