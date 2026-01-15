import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
import { rateLimiter } from "hono-rate-limiter";
import { Bindings, Variables } from "./utils/init";

// Initialize Hono app with custom bindings/variables
const app = new Hono<{ Bindings: Bindings, Variables: Variables }>();

// Enable CORS for frontend
app.use("/api/*", async (c, next) => {
    const corsMiddlewareHandler = cors({
        origin: c.env.CLIENT_URL,
        credentials: true,
    });
    return corsMiddlewareHandler(c, next);
});

// Apply rate limiting middleware
app.use(
    rateLimiter({
        windowMs: 10 * 60 * 1000, // 10 minutes
        limit: 100, // Limit each client to 100 requests per window
        keyGenerator: (c) => c.req.header("x-forwarded-for") ?? "", // Use IP address as key
    })
);

// Mount API routes
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;