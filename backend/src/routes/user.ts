import { Hono } from "hono";
import bcrypt from "bcryptjs";
import jwtLib from "jsonwebtoken";
import { initPrisma } from "../utils/db";
import { handleError } from "../utils/error";
import { Bindings, Variables } from "../utils/init";
import { setCookie, deleteCookie } from "hono/cookie";
import { SignInInput, signInInput, SignUpInput, signUpInput } from "@tigerxinsights/tigerxwrites";
import { blogAuth } from "../middlewares/blogAuth";

// User router (handles authentication & session management)
export const userRouter = new Hono<{ Bindings: Bindings, Variables: Variables }>();

/**
 * GET /signout
 * - Clears auth cookie
 * - Ends user session
 */
userRouter.get("/me", blogAuth, async (c) => {
    try {
        const userId = c.get("userId");
        return c.json({ message: "User authentication successful!!!", userId });
    } catch (error) {
        return c.json(handleError(error, c));
    }
});

userRouter.get("/signout", async (c) => {
    try {
        deleteCookie(c, "token", {
            path: "/api/v1",
        });
        return c.json({ message: "Signout successful!!!" });
    } catch (error) {
        return c.json(handleError(error, c));
    }
});

/**
 * POST /signup
 * - Validates input with Zod
 * - Hashes password
 * - Creates user in DB
 * - Issues JWT & sets auth cookie
 */
userRouter.post("/signup", async (c) => {
    try {
        const prisma = initPrisma(c);
        // Validate request body
        const body: SignUpInput = await c.req.json();
        const parsedInput = signUpInput.safeParse(body);
        if (!parsedInput.success) {
            c.status(400);
            return c.json({ message: "Invalid input!!!", details: parsedInput.error.issues });
        };

        // Hash password before storing
        const hashedPassword = bcrypt.hashSync(parsedInput.data.password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPassword,
            },
        });

        // Generate JWT & set cookie
        const token = await jwtLib.sign({ id: user.id }, c.env.JWT_SECRET, { expiresIn: "1h" });
        setCookie(c, "token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60,
            path: "/api/v1",
        });

        c.status(201);
        return c.json({ message: "Successfully created the user!!!" });
    }
    catch (error) {
        return c.json(handleError(error, c));
    }
});

/**
 * POST /signin
 * - Validates input with Zod
 * - Verifies user credentials
 * - Issues JWT & sets auth cookie
 */
userRouter.post("/signin", async (c) => {
    try {
        const prisma = initPrisma(c);
        // Validate request body
        const body: SignInInput = await c.req.json();
        const parsedInput = signInInput.safeParse(body);
        if (!parsedInput.success) {
            c.status(400);
            return c.json({ message: "Invalid input!!!", details: parsedInput.error.issues });
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
            }
        });

        if (!user) {
            c.status(401);
            return c.json({ error: "Invalid credentials!!!" });
        };

        // Verify password
        const passwordCheck = await bcrypt.compare(body.password, user.password);
        if (!passwordCheck) {
            c.status(401);
            return c.json({ error: "Invalid credentials!!!" });
        };

        // generate JWT
        const token = await jwtLib.sign({ id: user.id }, c.env.JWT_SECRET, { expiresIn: "1h" });
        // set cookie
        setCookie(c, "token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 60 * 60,
            path: "/api/v1",
        });
        return c.json({ message: "Sign In successful!!!" });
    }
    catch (error) {
        return c.json(handleError(error, c));
    }
});

// setCookie(c, "token", token, {
//     httpOnly: true,
//     secure: false,   // ❌ disable HTTPS-only
//     sameSite: "Lax", // ✅ safer for dev
//     maxAge: 60 * 60,
//     path: "/",       // ✅ available everywhere
// });