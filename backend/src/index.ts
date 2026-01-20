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

// Apply rate limiting middleware only in production
if (process.env.NODE_ENV !== "test") {
    app.use(
        rateLimiter<{ Bindings: Bindings }>({
            binding: (c) => c.env.MY_RATE_LIMITER,
            keyGenerator: (c) => c.req.header("cf-connecting-ip") ?? "",
        })
    );
}

// Mount API routes



app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);
app.get("/health", (c) => c.json({ ok: true }));

export default app;
