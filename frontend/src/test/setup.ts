import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mocking ErrorHandle
vi.mock("../utils/errors/errorHandle", () => ({
  errorHandle: vi.fn(),
}));

// Mocking useNavigate from React Router DOM
const mockedNavigate = vi.fn();
vi.mock(import("react-router-dom"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Mocking Axios
vi.mock("../utils/axios");

// Mocking React Toastify
vi.mock("react-toastify");

// Clear all mocks after each test
afterEach(() => {
  vi.clearAllMocks();
});

Object.defineProperty(window, "scrollTo", {
  value: vi.fn(),
  writable: true,
});
