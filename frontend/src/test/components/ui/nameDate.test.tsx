import { vi } from "vitest";
import NameDate from "../../../components/ui/nameDate";
import { render, screen, within } from "@testing-library/react";

vi.mock("../../../utils/dateAndTime", () => ({
  formatDate: (date: string) => date,
}));

describe("NameDate component", () => {
  // component render with default values
  test("render with default values", () => {
    render(<NameDate />);
    const nameDate = screen.getByRole("namedate");
    expect(nameDate).toBeInTheDocument();
    expect(within(nameDate).getByText("Sarah")).toBeInTheDocument();
    expect(within(nameDate).getByText("2025-10-08")).toBeInTheDocument();
  });

  // component render with provided values
  test("render with provided values", () => {
    render(<NameDate name="Tiger" date="2026-05-02" />);
    const nameDate = screen.getByRole("namedate");
    expect(nameDate).toBeInTheDocument();
    expect(within(nameDate).getByText("Tiger")).toBeInTheDocument();
    expect(within(nameDate).getByText("2026-05-02")).toBeInTheDocument();
  });
});
