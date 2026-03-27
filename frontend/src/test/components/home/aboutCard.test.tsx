import AboutCard from "../../../components/home/aboutCard";
import { render, screen, within } from "@testing-library/react";

describe("AboutCard component", () => {
  // component render with default values
  test("render with default values", () => {
    render(<AboutCard />);
    const aboutCard = screen.getByRole("aboutcard");
    expect(within(aboutCard).getByText("Title")).toBeInTheDocument();
    expect(within(aboutCard).getByText("Description")).toBeInTheDocument();
  });

  // component render with provided values
  test("render with provided values", () => {
    render(
      <AboutCard title="About Tiger Blogs" description="Tiger Blogs is the blogging website." />,
    );
    const aboutCard = screen.getByRole("aboutcard");
    expect(within(aboutCard).getByText("About Tiger Blogs")).toBeInTheDocument();
    expect(within(aboutCard).getByText("Tiger Blogs is the blogging website.")).toBeInTheDocument();
  });
});
