import { render, screen } from "@testing-library/react";
import { GithubIcon, LinkedinIcon, TwitterIcon, YoutubeIcon } from "../../../components/icons";

describe("Icons components", () => {
  // component render github svg icon
  test("render github svg icon", () => {
    render(<GithubIcon />);
    expect(screen.getByRole("icon")).toBeInTheDocument();
  });

  // component render linkedin svg icon
  test("render linkedin svg icon", () => {
    render(<LinkedinIcon />);
    expect(screen.getByRole("icon")).toBeInTheDocument();
  });

  // component render twitter svg icon
  test("render twitter svg icon", () => {
    render(<TwitterIcon />);
    expect(screen.getByRole("icon")).toBeInTheDocument();
  });

  // component render youtube svg icon
  test("render youtube svg icon", () => {
    render(<YoutubeIcon />);
    expect(screen.getByRole("icon")).toBeInTheDocument();
  });
});
