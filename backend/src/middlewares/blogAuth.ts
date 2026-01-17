import { verify } from "hono/jwt";
import { getCookie } from "hono/cookie";
import { MyContext } from "../utils/init";

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
        };

        // Verify token and extract user ID
        const decoded = (await verify(token, c.env.JWT_SECRET, "ES256")) as { id: string };
        if (!decoded || !decoded.id) {
            c.status(403);
            return c.json({ message: "Unauthorized!!!" });
        }

        // Store userId in context for downstream handlers
        c.set("userId", decoded.id);
        await next();
    }
    catch (error) {
        c.status(500);
        return c.json({ message: "Internal Server Error!!!" });
    }
};