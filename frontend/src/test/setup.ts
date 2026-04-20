import { vi } from "vitest";
import "@testing-library/jest-dom";

vi.mock("../utils/errors/errorHandle", () => ({
  errorHandle: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
});

Object.defineProperty(window, "scrollTo", {
  value: vi.fn(),
  writable: true,
});
