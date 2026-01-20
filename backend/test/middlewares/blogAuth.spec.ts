import type { MyContext } from "../../src/utils/init";
import { blogAuth } from "../../src/middlewares/blogAuth";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("hono/cookie", () => ({
    getCookie: vi.fn(),
}));

vi.mock("hono/jwt", () => ({
    verify: vi.fn(),
}));

import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

function createMockContext() {
    return {
        env: {
            JWT_SECRET: "jwt_secret",
        },
        status: vi.fn(),
        json: vi.fn((data) => data),
        set: vi.fn(),
    } as unknown as MyContext;
};

describe("blogAuth middleware", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return 403 if token missing", async () => {
        const c = createMockContext();
        const next = vi.fn();

        (getCookie as any).mockReturnValue(undefined);

        const result = await blogAuth(c, next);

        expect(c.status).toHaveBeenCalledWith(403);
        expect(c.json).toHaveBeenCalledWith({ message: "Unauthorized!!!" });
        expect(next).not.toHaveBeenCalled();
        expect(result).toEqual({ message: "Unauthorized!!!" });
    });

    it("should return 403 if token invalid (decoded has no id)", async () => {
        const c = createMockContext();
        const next = vi.fn();

        (getCookie as any).mockReturnValue("token_123");
        (verify as any).mockResolvedValue({}); // no id

        const result = await blogAuth(c, next);

        expect(verify).toHaveBeenCalledWith("token_123", "jwt_secret", "ES256");
        expect(c.status).toHaveBeenCalledWith(403);
        expect(c.json).toHaveBeenCalledWith({ message: "Unauthorized!!!" });
        expect(next).not.toHaveBeenCalled();
        expect(result).toEqual({ message: "Unauthorized!!!" });
    });

    it("should set userId and call next() if token valid", async () => {
        const c = createMockContext();
        const next = vi.fn().mockResolvedValue(undefined);

        (getCookie as any).mockReturnValue("token_123");
        (verify as any).mockResolvedValue({ id: "user_1" });

        const result = await blogAuth(c, next);

        expect(verify).toHaveBeenCalledWith("token_123", "jwt_secret", "ES256");
        expect(c.set).toHaveBeenCalledWith("userId", "user_1");
        expect(next).toHaveBeenCalledTimes(1);

        // no error response
        expect(c.status).not.toHaveBeenCalled();
        expect(c.json).not.toHaveBeenCalled();
        expect(result).toBeUndefined();
    });

    it("should return 500 if verify throws error", async () => {
        const c = createMockContext();
        const next = vi.fn();

        (getCookie as any).mockReturnValue("token_123");
        (verify as any).mockRejectedValue(new Error("jwt error"));

        const result = await blogAuth(c, next);

        expect(c.status).toHaveBeenCalledWith(500);
        expect(c.json).toHaveBeenCalledWith({ message: "Internal Server Error!!!" });
        expect(next).not.toHaveBeenCalled();
        expect(result).toEqual({ message: "Internal Server Error!!!" });
    });
});