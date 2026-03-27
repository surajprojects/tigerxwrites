import Quote from "../../../components/home/quote";
import { render, screen, within } from "@testing-library/react";

describe("Quote component", () => {
  // component render with default values
  test("render with default values", () => {
    render(<Quote />);
    const quote = screen.getByRole("quote");
    // Text
    expect(
      within(quote).getByText(
        `"The customer service I received was exceptional. The support team went above and beyond to address my concerns."`,
      ),
    ).toBeInTheDocument();
    // Author
    expect(within(quote).getByText("Jules Winnfield")).toBeInTheDocument();
    // Position
    expect(within(quote).getByText("CEO, Acme Inc")).toBeInTheDocument();
  });

  // component render with provided values
  test("render with provided values", () => {
    render(
      <Quote
        text="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores odio blanditiis numquam excepturi repellat ipsam commodi eligendi expedita delectus vitae aperiam voluptate beatae mollitia pariatur cum reprehenderit, illum magnam. Possimus?"
        author="Tiger"
        position="Developer"
      />,
    );
    const quote = screen.getByRole("quote");
    // Text
    expect(
      within(quote).getByText(
        `"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores odio blanditiis numquam excepturi repellat ipsam commodi eligendi expedita delectus vitae aperiam voluptate beatae mollitia pariatur cum reprehenderit, illum magnam. Possimus?"`,
      ),
    ).toBeInTheDocument();
    // Author
    expect(within(quote).getByText("Tiger")).toBeInTheDocument();
    // Position
    expect(within(quote).getByText("Developer")).toBeInTheDocument();
  });
});
