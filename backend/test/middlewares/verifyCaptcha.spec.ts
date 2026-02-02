import type { MyContext } from "../../src/utils/init";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { verifyCaptcha } from "../../src/middlewares/verifyCaptcha";

function createMockContext({ captchaToken = "captchaToken", secretKey = "secretKey" } = {}) {
  return {
    env: {
      SECRET_KEY: secretKey,
    },
    req: {
      json: vi.fn().mockResolvedValue({ captchaToken }),
    },
    status: vi.fn(),
    json: vi.fn((data) => data),
  } as unknown as MyContext;
}

describe("Verify captcha middleware (unit)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should call next() when captcha is valid", async () => {
    const c = createMockContext();
    const next = vi.fn().mockResolvedValue(undefined);

    // mock fetch to return success:true
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ success: true }),
      } as any),
    );

    await verifyCaptcha(c, next);

    // should call next
    expect(next).toHaveBeenCalledTimes(1);

    // should NOT return error
    expect(c.status).not.toHaveBeenCalled();
    expect(c.json).not.toHaveBeenCalled();
  });

  it("should return 500 when captcha fails (success:false)", async () => {
    const c = createMockContext();
    const next = vi.fn();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ success: false }),
      } as any),
    );

    const result = await verifyCaptcha(c, next);

    // should NOT call next
    expect(next).not.toHaveBeenCalled();

    // should return error response
    expect(c.status).toHaveBeenCalledWith(500);
    expect(c.json).toHaveBeenCalledWith({ message: "Internal Server Error!!!" });
    expect(result).toEqual({ message: "Internal Server Error!!!" });
  });

  it("should return 500 when fetch throws error", async () => {
    const c = createMockContext();
    const next = vi.fn();

    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network fail")));

    const result = await verifyCaptcha(c, next);

    expect(next).not.toHaveBeenCalled();
    expect(c.status).toHaveBeenCalledWith(500);
    expect(c.json).toHaveBeenCalledWith({ message: "Internal Server Error!!!" });
    expect(result).toEqual({ message: "Internal Server Error!!!" });
  });

  it("should return 500 when body doesn't contain captchaToken", async () => {
    const c = createMockContext();
    (c.req.json as any).mockResolvedValue({}); // no captchaToken

    const next = vi.fn();

    // still mock fetch (though it may fail earlier / fetch gets invalid)
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue({ success: false }),
      } as any),
    );

    const result = await verifyCaptcha(c, next);

    expect(next).not.toHaveBeenCalled();
    expect(c.status).toHaveBeenCalledWith(500);
    expect(result).toEqual({ message: "Internal Server Error!!!" });
  });
});
