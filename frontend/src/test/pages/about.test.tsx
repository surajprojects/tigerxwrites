import About from "../../pages/About";
import { render, screen, within } from "@testing-library/react";

describe("About page", () => {
  // renders about page
  test("renders about page", () => {
    render(<About />);
    expect(screen.getByRole("about")).toBeInTheDocument();
    // About Tiger Writes
    expect(screen.getByRole("abouttigerwrites")).toBeInTheDocument();
    expect(screen.getByRole("abouttitle")).toHaveTextContent("About Tiger Writes");
    expect(
      screen.getByText(
        "Tiger Writes is a platform where words roar to life. We believe that every writer has a unique voice that deserves to be heard, and every story has the power to connect, inspire, and transform.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Founded on the principles of authenticity and community, we've created a space where writers can share their perspectives on any topic that matters to them. Whether you're a seasoned author or just beginning your writing journey, Tiger Writes welcomes you.",
      ),
    ).toBeInTheDocument();
    // Our Mission
    expect(screen.getByText("Our Mission")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We're dedicated to empowering writers and readers alike. Our mission is to create a platform that celebrates the written word in all its forms—from personal essays and creative fiction to technical guides and thought leadership.",
      ),
    ).toBeInTheDocument();
    // Why Tiger?
    expect(screen.getByText("Why Tiger?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "The tiger represents strength, courage, and individuality—qualities we believe every writer embodies. Just as a tiger's stripes are unique, so too is every writer's voice. We chose the tiger as our symbol to remind writers that their distinct perspective is their greatest strength.",
      ),
    ).toBeInTheDocument();
    // Join Our Community
    expect(screen.getByText("Join Our Community")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Whether you're here to read, write, or both, we're glad you're part of our community. Together, we're building a space where diverse voices can flourish and meaningful conversations can begin.",
      ),
    ).toBeInTheDocument();
    // Get in Touch
    expect(screen.getByRole("getintouch")).toBeInTheDocument();
    expect(
      within(screen.getByRole("getintouch")).getByText("Have questions or want to collaborate?"),
    ).toBeInTheDocument();
    expect(screen.getByRole("contactbtn")).toHaveAttribute(
      "href",
      "https://tigerxinsights.vercel.app/#contact",
    );
  });
});
