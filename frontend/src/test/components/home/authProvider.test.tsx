/* eslint-disable @typescript-eslint/no-explicit-any */

import { vi } from "vitest";
import { useContext } from "react";
import axiosInstance from "../../../utils/axios";
import { UserDataContext } from "../../../store/userContext";
import { render, screen, waitFor } from "@testing-library/react";
import AuthProvider from "../../../components/home/authProvider";

function TestConsumer() {
  const ctx = useContext(UserDataContext);
  return <div>{ctx?.userData.name}</div>;
}

vi.mock("../../../components/ui/spinner", () => ({
  default: () => <div>Loading...</div>,
}));

describe("AuthProvider component", () => {
  // component renders
  test("shows spinner while loading", async () => {
    let resolvePromise: any;

    (axiosInstance.get as any) = vi.fn(
      () =>
        new Promise((resolve) => {
          resolvePromise = resolve;
        }),
    );

    render(
      <AuthProvider>
        <div>App Content</div>
      </AuthProvider>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    waitFor(() => {
      resolvePromise({
        data: {
          userData: {
            id: "1",
            name: "Tiger",
            email: "test@test.com",
            bio: "Dev",
          },
        },
      });
    });
  });

  test("renders children after loading", async () => {
    (axiosInstance.get as any) = vi.fn().mockResolvedValue({
      data: {
        userData: {
          id: "1",
          name: "Tiger",
          email: "test@test.com",
          bio: "Dev",
        },
      },
    });

    render(
      <AuthProvider>
        <div>App Content</div>
      </AuthProvider>,
    );

    expect(await screen.findByText("App Content")).toBeInTheDocument();
  });

  test("provides user data", async () => {
    (axiosInstance.get as any) = vi.fn().mockResolvedValue({
      data: {
        userData: {
          id: "1",
          name: "Tiger",
          email: "test@test.com",
          bio: "Dev",
        },
      },
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>,
    );

    expect(await screen.findByText("Tiger")).toBeInTheDocument();
  });
});
