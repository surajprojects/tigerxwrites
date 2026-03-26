import ReadTime from "../../../components/ui/readTime";
import { render, screen } from "@testing-library/react";

describe("ReadTime component", () => {
  // component render with default values
  test("render with default values", () => {
    render(<ReadTime />);
    expect(screen.getByRole("readtime")).toBeInTheDocument();
    expect(screen.getByText("1 min read")).toBeInTheDocument();
  });

  // component render with provided values
  test("render with provided values", () => {
    render(
      <ReadTime content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur distinctio a laudantium dolore praesentium quos minus sint officiis dicta. Suscipit dolores similique laudantium obcaecati repellat esse veniam quis atque tenetur.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur distinctio a laudantium dolore praesentium quos minus sint officiis dicta. Suscipit dolores similique laudantium obcaecati repellat esse veniam quis atque tenetur.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur distinctio a laudantium dolore praesentium quos minus sint officiis dicta. Suscipit dolores similique laudantium obcaecati repellat esse veniam quis atque tenetur.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur distinctio a laudantium dolore praesentium quos minus sint officiis dicta. Suscipit dolores similique laudantium obcaecati repellat esse veniam quis atque tenetur. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur distinctio a laudantium dolore praesentium quos minus sint officiis dicta. Suscipit dolores similique laudantium obcaecati repellat esse veniam quis atque tenetur.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur distinctio a laudantium dolore praesentium quos minus sint officiis dicta. Suscipit dolores similique laudantium obcaecati repellat esse veniam quis atque tenetur.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur distinctio a laudantium dolore praesentium quos minus sint officiis dicta. Suscipit dolores similique laudantium obcaecati repellat esse veniam quis atque tenetur.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur distinctio a laudantium dolore praesentium quos minus sint officiis dicta. Suscipit dolores similique laudantium obcaecati repellat esse veniam quis atque tenetur." />,
    );
    expect(screen.getByRole("readtime")).toBeInTheDocument();
    expect(screen.getByText("2 mins read")).toBeInTheDocument();
  });
});
