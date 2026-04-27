import { Hono } from "hono";
import bcrypt from "bcryptjs";
import jwtLib from "jsonwebtoken";
import { verify } from "hono/jwt";
import { initPrisma } from "../utils/db";
import { handleError } from "../utils/error";
import { blogAuth } from "../middlewares/blogAuth";
import { Bindings, Variables } from "../utils/init";
import { verifyCaptcha } from "../middlewares/verifyCaptcha";
import { setCookie, deleteCookie, getCookie } from "hono/cookie";
import { SignInInput, signInInput, SignUpInput, signUpInput } from "@tigerxinsights/tigerxwrites";

// User router (handles authentication & session management)
export const userRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

userRouter.get("/me", blogAuth, async (c) => {
  try {
    const userData = c.get("userData");
    return c.json({ message: "User authentication successfull!!!", userData });
  } catch (error) {
    return c.json(handleError(error, c));
  }
});

userRouter.post("/refresh", async (c) => {
  try {
    const prisma = initPrisma(c);
    const refreshToken = getCookie(c, "refreshToken");

    if (!refreshToken) {
      throw new Error();
    }

    const decoded = (await verify(refreshToken, c.env.REFRESH_TOKEN_SECRET, "HS256")) as {
      id: string;
    };

    const sessionListData = await prisma.session.findMany({
      where: {
        userId: decoded.id,
        isRevoked: false,
        expiresAt: {
          gt: new Date(), // not expired
        },
      },
    });

    if (!(sessionListData.length > 0)) {
      throw new Error("Invalid or expired session");
    }

    const sessionData = sessionListData.find(async (session) => {
      const isSessionFound = await bcrypt.compare(refreshToken, session.refreshToken);
      if (isSessionFound) {
        return session;
      }
    });

    if (!sessionData) {
      throw new Error("Invalid or expired session");
    }

    // Revoke old refresh token
    await prisma.session.update({
      where: {
        id: sessionData.id,
        isRevoked: false,
        expiresAt: {
          gt: new Date(), // not expired
        },
      },
      data: { isRevoked: true },
    });

    // Generate access token & refresh token
    const accessToken = await jwtLib.sign({ id: decoded.id }, c.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15Mins",
    });

    const newRefreshToken = await jwtLib.sign({ id: decoded.id }, c.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "15Days",
    });

    // Hash refresh token before storing
    const hashedNewRefreshToken = bcrypt.hashSync(newRefreshToken, 8);

    // Create new refresh token
    await prisma.session.create({
      data: {
        userId: decoded.id,
        refreshToken: hashedNewRefreshToken,
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      },
    });

    // Set cookie
    setCookie(c, "accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 15 * 60, // mins x secs
      path: "/api/v1",
    });
    setCookie(c, "refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 15 * 24 * 60 * 60, // days x hrs x mins x secs
      path: "/api/v1",
    });

    c.status(201);
    return c.json({ message: "Refresh successfull!!!" });
  } catch (error) {
    console.log(error);
    return c.json(handleError(error, c));
  }
});

/**
 * POST /signout
 * - Clears auth cookie
 * - Ends user session
 */
userRouter.post("/signout", async (c) => {
  try {
    const prisma = initPrisma(c);
    const refreshToken = getCookie(c, "refreshToken");

    if (refreshToken) {
      const decoded = (await verify(refreshToken, c.env.REFRESH_TOKEN_SECRET, "HS256")) as {
        id: string;
      };

      const sessionListData = await prisma.session.findMany({
        where: {
          userId: decoded.id,
          isRevoked: false,
          expiresAt: {
            gt: new Date(), // not expired
          },
        },
      });

      if (!(sessionListData.length > 0)) {
        throw new Error("Invalid or expired session");
      }

      const sessionData = sessionListData.find(async (session) => {
        const isSessionFound = await bcrypt.compare(refreshToken, session.refreshToken);
        if (isSessionFound) {
          return session;
        }
      });

      if (!sessionData) {
        throw new Error("Invalid or expired session");
      }

      await prisma.session.update({
        where: {
          id: sessionData.id,
          userId: decoded.id,
        },
        data: {
          isRevoked: true,
        },
      });

      deleteCookie(c, "refreshToken", {
        path: "/api/v1",
      });
    }

    deleteCookie(c, "accessToken", {
      path: "/api/v1",
    });

    c.status(201);
    return c.json({ message: "Signout successfull!!!" });
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
userRouter.post("/signup", verifyCaptcha, async (c) => {
  try {
    const prisma = initPrisma(c);
    // Validate request body
    const body = await c.req.json<{ captchaToken?: string } & SignUpInput>();
    const { captchaToken: _captchaToken, ...signInInputData } = body;
    const parsedInput = signUpInput.safeParse(signInInputData);
    if (!parsedInput.success) {
      c.status(400);
      return c.json({ message: "Invalid input!!!", details: parsedInput.error.issues });
    }

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

    // Generate access token & refresh token
    const accessToken = await jwtLib.sign({ id: user.id }, c.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15Mins",
    });

    const refreshToken = await jwtLib.sign({ id: user.id }, c.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "15Days",
    });

    // Hash refresh token before storing
    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 8);

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: hashedRefreshToken,
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      },
    });

    // Set cookie
    setCookie(c, "accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 15 * 60, // mins x secs
      path: "/api/v1",
    });
    setCookie(c, "refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 15 * 24 * 60 * 60, // days x hrs x mins x secs
      path: "/api/v1",
    });

    c.status(201);
    return c.json({
      message: "Successfully created the user!!!",
      userData: {
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      },
    });
  } catch (error) {
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
      },
    });

    if (!user) {
      c.status(401);
      return c.json({ error: "Invalid credentials!!!" });
    }

    // Verify password
    const passwordCheck = await bcrypt.compare(body.password, user.password);
    if (!passwordCheck) {
      c.status(401);
      return c.json({ error: "Invalid credentials!!!" });
    }

    // Generate access token & refresh token
    const accessToken = await jwtLib.sign({ id: user.id }, c.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15Mins",
    });

    const refreshToken = await jwtLib.sign({ id: user.id }, c.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "15Days",
    });

    // Hash refresh token before storing
    const hashedRefreshToken = bcrypt.hashSync(refreshToken, 8);

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: hashedRefreshToken,
        expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      },
    });

    // Set cookie
    setCookie(c, "accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 15 * 60, // mins x secs
      path: "/api/v1",
    });
    setCookie(c, "refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 15 * 24 * 60 * 60, // days x hrs x mins x secs
      path: "/api/v1",
    });

    c.status(201);
    return c.json({
      message: "Sign In successfull!!!",
      userData: {
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
      },
    });
  } catch (error) {
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
