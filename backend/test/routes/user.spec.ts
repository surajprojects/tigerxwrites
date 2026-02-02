import { Hono } from "hono";
import { userRouter } from "../../src/routes/user";
import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Bindings, Variables } from "../../src/utils/init";

/* ---------------- MOCKS ---------------- */

vi.mock("../../src/utils/db", () => ({
  initPrisma: vi.fn(),
}));

vi.mock("bcryptjs", () => ({
  default: {
    hashSync: vi.fn(),
    compare: vi.fn(),
  },
}));

vi.mock("jsonwebtoken", () => ({
  default: {
    sign: vi.fn(),
  },
}));

vi.mock("hono/cookie", () => ({
  setCookie: vi.fn(),
  deleteCookie: vi.fn(),
}));

// bypass captcha middleware
vi.mock("../../src/middlewares/verifyCaptcha", () => ({
  verifyCaptcha: async (_c: any, next: any) => next(),
}));

// mock blogAuth for /me route
vi.mock("../../src/middlewares/blogAuth", () => ({
  blogAuth: async (c: any, next: any) => {
    c.set("userId", "user_123");
    await next();
  },
}));

// zod schemas
vi.mock("@tigerxinsights/tigerxwrites", () => ({
  signUpInput: { safeParse: vi.fn() },
  signInInput: { safeParse: vi.fn() },
}));

/* ---------------- IMPORT AFTER MOCK ---------------- */

import bcrypt from "bcryptjs";
import jwtLib from "jsonwebtoken";
import { initPrisma } from "../../src/utils/db";
import { setCookie, deleteCookie } from "hono/cookie";
import { signUpInput, signInInput } from "@tigerxinsights/tigerxwrites";

/* ---------------- APP SETUP ---------------- */

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();
app.route("/api/v1/user", userRouter);

const env = { JWT_SECRET: "jwt_secret" };

/* ---------------- TESTS ---------------- */

describe("User Router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /* ---------- /me ---------- */
  it("GET /me should return authenticated user", async () => {
    const res = await app.request("/api/v1/user/me", {}, env);
    const body = (await res.json()) as { message: string; userId: string };

    expect(res.status).toBe(200);
    expect(body.userId).toBe("user_123");
  });

  /* ---------- /signout ---------- */
  it("GET /signout should clear cookie", async () => {
    const res = await app.request("/api/v1/user/signout", {}, env);
    const body = (await res.json()) as { message: string };

    expect(deleteCookie).toHaveBeenCalledWith(expect.anything(), "token", {
      path: "/api/v1",
    });
    expect(body.message).toBe("Signout successful!!!");
  });

  /* ---------- /signup success ---------- */
  it("POST /signup should create user and set cookie", async () => {
    const prismaMock = {
      user: { create: vi.fn().mockResolvedValue({ id: "user_1" }) },
    };
    (initPrisma as any).mockReturnValue(prismaMock);

    (signUpInput.safeParse as any).mockReturnValue({
      success: true,
      data: { name: "Tiger", email: "a@a.com", password: "pass" },
    });

    (bcrypt.hashSync as any).mockReturnValue("hashed_pass");
    (jwtLib.sign as any).mockResolvedValue("jwt_token");

    const res = await app.request(
      "/api/v1/user/signup",
      {
        method: "POST",
        body: JSON.stringify({
          name: "Tiger",
          email: "a@a.com",
          password: "pass",
          captchaToken: "token",
        }),
        headers: { "Content-Type": "application/json" },
      },
      env,
    );

    const body = (await res.json()) as { message: string };

    expect(prismaMock.user.create).toHaveBeenCalled();
    expect(setCookie).toHaveBeenCalled();
    expect(body.message).toBe("Successfully created the user!!!");
    expect(res.status).toBe(201);
  });

  /* ---------- /signup invalid input ---------- */
  it("POST /signup should fail if validation fails", async () => {
    (signUpInput.safeParse as any).mockReturnValue({ success: false, error: { issues: [] } });

    const res = await app.request(
      "/api/v1/user/signup",
      {
        method: "POST",
        body: JSON.stringify({}),
        headers: { "Content-Type": "application/json" },
      },
      env,
    );

    expect(res.status).toBe(400);
  });

  /* ---------- /signin success ---------- */
  it("POST /signin should login user", async () => {
    const prismaMock = {
      user: {
        findUnique: vi.fn().mockResolvedValue({
          id: "user_1",
          password: "hashed_pass",
        }),
      },
    };
    (initPrisma as any).mockReturnValue(prismaMock);

    (signInInput.safeParse as any).mockReturnValue({ success: true });
    (bcrypt.compare as any).mockResolvedValue(true);
    (jwtLib.sign as any).mockResolvedValue("jwt_token");

    const res = await app.request(
      "/api/v1/user/signin",
      {
        method: "POST",
        body: JSON.stringify({ email: "a@a.com", password: "pass" }),
        headers: { "Content-Type": "application/json" },
      },
      env,
    );

    const body = (await res.json()) as { message: string };

    expect(setCookie).toHaveBeenCalled();
    expect(body.message).toBe("Sign In successful!!!");
  });

  /* ---------- /signin wrong password ---------- */
  it("POST /signin should reject wrong password", async () => {
    const prismaMock = {
      user: {
        findUnique: vi.fn().mockResolvedValue({
          id: "user_1",
          password: "hashed_pass",
        }),
      },
    };
    (initPrisma as any).mockReturnValue(prismaMock);

    (signInInput.safeParse as any).mockReturnValue({ success: true });
    (bcrypt.compare as any).mockResolvedValue(false);

    const res = await app.request(
      "/api/v1/user/signin",
      {
        method: "POST",
        body: JSON.stringify({ email: "a@a.com", password: "wrong" }),
        headers: { "Content-Type": "application/json" },
      },
      env,
    );

    expect(res.status).toBe(401);
  });
});
