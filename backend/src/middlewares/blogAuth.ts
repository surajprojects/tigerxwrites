import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";
import { MyContext } from "../utils/init";
import { initPrisma } from "../utils/db";

/**
 * Blog authentication middleware
 * - Extracts JWT from cookie
 * - Verifies token using secret
 * - Attaches userId to context if valid
 * - Blocks request if missing/invalid token
 */
export const blogAuth = async (c: MyContext, next: () => Promise<void>) => {
  try {
    // Get JWT token from cookie
    const token = getCookie(c, "token");

    if (!token) {
      c.status(403);
      return c.json({ message: "Unauthorized!!!" });
    }

    // Verify token and extract user ID
    const decoded = (await verify(token, c.env.JWT_SECRET, "HS256")) as { id: string };
    if (!decoded || !decoded.id) {
      c.status(403);
      return c.json({ message: "Unauthorized!!!" });
    }

    const prisma = initPrisma(c);
    const userData = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
        bio: true,
        name: true,
      },
    });

    if (!userData) {
      c.status(404);
      return c.json({ message: "User not found!!!" });
    }

    c.set("userData", userData);
    await next();
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Internal Server Error!!!" });
  }
};
