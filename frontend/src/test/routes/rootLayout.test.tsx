import { vi } from "vitest";
import axiosInstance from "../../utils/axios";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../testUtils";

vi.mock("../../utils/axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

afterEach(() => {
  vi.clearAllMocks();
});

beforeEach(() => {
  axiosInstance.get = vi.fn().mockImplementation((url: string) => {
    if (url.includes("user/me")) {
      return Promise.resolve({
        data: {
          userData: {
            id: "1",
            name: "tiger",
            email: "email@gmail.com",
            bio: null,
          },
        },
      });
    }

    if (url.includes("blog/page")) {
      return Promise.resolve({
        data: {
          bulkBlogs: [],
          blogsCount: 0,
        },
      });
    }

    return Promise.resolve({ data: {} });
  });
});

describe("RootLayout route", () => {
  // renders home page on / path
  test("renders home page on / path", async () => {
    renderWithRouter("/");
    // RootLayout Component
    expect(await screen.findByRole("wrapper")).toBeInTheDocument();
    expect(await screen.findByRole("header")).toBeInTheDocument();
    expect(await screen.findByRole("maincontent")).toBeInTheDocument();
    expect(await screen.findByRole("footer")).toBeInTheDocument();
    // Home Component
    expect(await screen.findByRole("home")).toBeInTheDocument();
    expect(await screen.findByRole("backgroundimage")).toBeInTheDocument();
    expect(await screen.findByRole("content")).toBeInTheDocument();
    expect(await screen.findByRole("cta")).toBeInTheDocument();
    expect(await screen.findByRole("featured")).toBeInTheDocument();
  });

  // renders about page on /about path
  test("renders about page on /about path", async () => {
    renderWithRouter("/about");
    // RootLayout Component
    expect(await screen.findByRole("wrapper")).toBeInTheDocument();
    expect(await screen.findByRole("header")).toBeInTheDocument();
    expect(await screen.findByRole("maincontent")).toBeInTheDocument();
    expect(await screen.findByRole("footer")).toBeInTheDocument();
    // About Component
    expect(await screen.findByRole("about")).toBeInTheDocument();
    expect(await screen.findByRole("abouttigerwrites")).toBeInTheDocument();
    expect(await screen.findByRole("getintouch")).toBeInTheDocument();
  });

  // renders 404 page not found on /random path
  test("renders 404 page not found on /random path", async () => {
    renderWithRouter("/random");
    // RootLayout Component
    expect(await screen.findByRole("wrapper")).toBeInTheDocument();
    expect(await screen.findByRole("header")).toBeInTheDocument();
    expect(await screen.findByRole("maincontent")).toBeInTheDocument();
    expect(await screen.findByRole("footer")).toBeInTheDocument();
    // 404 page not found
    expect(await screen.findByRole("pagenotfound")).toBeInTheDocument();
  });
});
