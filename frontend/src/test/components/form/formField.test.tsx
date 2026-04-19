import type { ChangeEvent } from "react";
import FormField from "../../../components/form/formField";
import { render, screen, within } from "@testing-library/react";

describe("FormField component", () => {
  // component render with default values
  test("render with default values", () => {
    const onChangeFunction = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      ([] as ChangeEvent<HTMLInputElement | HTMLSelectElement>[]).push(evt);
    };

    render(<FormField fieldValue="" onChangeFunc={onChangeFunction} />);

    const formField = screen.getByRole("formfield");
    expect(formField).toBeInTheDocument();
    const nameInput = within(formField).getByLabelText("Name");
    expect(nameInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveAttribute("id", "name");
    expect(nameInput).toHaveAttribute("name", "name");
    expect(nameInput).toHaveAttribute("value", "");
    expect(nameInput).toHaveAttribute("placeholder", "Enter your name");
    expect(nameInput).toBeRequired();
  });

  // component render with provided values
  test("render with provided values", () => {
    const onChangeFunction = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      ([] as ChangeEvent<HTMLInputElement | HTMLSelectElement>[]).push(evt);
    };

    render(
      <FormField
        id="email"
        title="Email"
        fieldType="email"
        textHolder="example@email.com"
        fieldValue="tigerblogs@email.com"
        isRequired={false}
        onChangeFunc={onChangeFunction}
      />,
    );

    const formField = screen.getByRole("formfield");
    expect(formField).toBeInTheDocument();
    const emailInput = within(formField).getByLabelText("Email");
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("id", "email");
    expect(emailInput).toHaveAttribute("name", "email");
    expect(emailInput).toHaveAttribute("value", "tigerblogs@email.com");
    expect(emailInput).toHaveAttribute("placeholder", "example@email.com");
    expect(emailInput).not.toBeRequired();
  });

  // component render with children when textholder is true (default)
  test("render with children when textholder is true (default)", () => {
    const onChangeFunction = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      ([] as ChangeEvent<HTMLInputElement | HTMLSelectElement>[]).push(evt);
    };

    render(
      <FormField fieldValue="" onChangeFunc={onChangeFunction}>
        <p role="testchildren">Tiger Blogs</p>
      </FormField>,
    );

    const formField = screen.getByRole("formfield");
    const inputWrapper = within(formField).getByRole("inputwrapper");
    expect(within(inputWrapper).getByRole("testchildren")).toHaveTextContent("Tiger Blogs");
    const nameInput = within(formField).getByLabelText("Name");
    expect(nameInput).toHaveAttribute("placeholder", "Enter your name");
    expect(nameInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveAttribute("id", "name");
    expect(nameInput).toHaveAttribute("name", "name");
    expect(nameInput).toHaveAttribute("value", "");
    expect(nameInput).toBeRequired();
  });

  // component render without children when textholder is false
  test("render without children when textholder is false", () => {
    const onChangeFunction = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      ([] as ChangeEvent<HTMLInputElement | HTMLSelectElement>[]).push(evt);
    };

    render(
      <FormField isTextHolder={false} fieldValue="" onChangeFunc={onChangeFunction}>
        <p role="testchildren">Tiger Blogs</p>
      </FormField>,
    );

    const formField = screen.getByRole("formfield");
    expect(within(formField).queryByRole("inputwrapper")).not.toBeInTheDocument();
    expect(within(formField).queryByText("Tiger Blogs")).not.toBeInTheDocument();
    const nameInput = within(formField).getByLabelText("Name");
    expect(nameInput).not.toHaveAttribute("placeholder", "Enter your name");
    expect(nameInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveAttribute("id", "name");
    expect(nameInput).toHaveAttribute("name", "name");
    expect(nameInput).toHaveAttribute("value", "");
    expect(nameInput).toBeRequired();
  });

  // component render with placeholder when textholder is true (default)
  test("render with placeholder when textholder is true (default)", () => {
    const onChangeFunction = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      ([] as ChangeEvent<HTMLInputElement | HTMLSelectElement>[]).push(evt);
    };

    render(<FormField fieldValue="" onChangeFunc={onChangeFunction} />);

    const formField = screen.getByRole("formfield");
    const nameInput = within(formField).getByLabelText("Name");
    expect(nameInput).toHaveAttribute("placeholder", "Enter your name");
    expect(nameInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveAttribute("id", "name");
    expect(nameInput).toHaveAttribute("name", "name");
    expect(nameInput).toHaveAttribute("value", "");
    expect(nameInput).toBeRequired();
  });

  // component render without placeholder when textholder is false
  test("render without placeholder when textholder is false", () => {
    const onChangeFunction = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      ([] as ChangeEvent<HTMLInputElement | HTMLSelectElement>[]).push(evt);
    };

    render(<FormField isTextHolder={false} fieldValue="" onChangeFunc={onChangeFunction} />);

    const formField = screen.getByRole("formfield");
    const nameInput = within(formField).getByLabelText("Name");
    expect(nameInput).not.toHaveAttribute("placeholder", "Enter your name");
    expect(nameInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveAttribute("id", "name");
    expect(nameInput).toHaveAttribute("name", "name");
    expect(nameInput).toHaveAttribute("value", "");
    expect(nameInput).toBeRequired();
  });

  // component render without message when show message is false (default)
  test("render without message when show message is false (default)", () => {
    const onChangeFunction = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      ([] as ChangeEvent<HTMLInputElement | HTMLSelectElement>[]).push(evt);
    };

    render(<FormField fieldValue="" onChangeFunc={onChangeFunction} />);

    const formField = screen.getByRole("formfield");
    expect(within(formField).queryByText("Alright! Username available!")).not.toBeInTheDocument();
    expect(within(formField).queryByText("Oops! Username already taken!")).not.toBeInTheDocument();

    const nameInput = within(formField).getByLabelText("Name");
    expect(nameInput).toHaveAttribute("placeholder", "Enter your name");
    expect(nameInput).toHaveAttribute("type", "text");
    expect(nameInput).toHaveAttribute("id", "name");
    expect(nameInput).toHaveAttribute("name", "name");
    expect(nameInput).toHaveAttribute("value", "");
    expect(nameInput).toBeRequired();
  });

  describe("Message display when showMessage is true", () => {
    // component render with default success message when isSuccess is true (default)
    test("render with default success message when isSuccess is true (default)", () => {
      const onChangeFunction = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        ([] as ChangeEvent<HTMLInputElement | HTMLSelectElement>[]).push(evt);
      };

      render(<FormField showMessage={true} fieldValue="" onChangeFunc={onChangeFunction} />);

      const formField = screen.getByRole("formfield");
      expect(within(formField).queryByText("Alright! Username available!")).toBeInTheDocument();
      expect(
        within(formField).queryByText("Oops! Username already taken!"),
      ).not.toBeInTheDocument();

      const nameInput = within(formField).getByLabelText("Name");
      expect(nameInput).toHaveAttribute("placeholder", "Enter your name");
      expect(nameInput).toHaveAttribute("type", "text");
      expect(nameInput).toHaveAttribute("id", "name");
      expect(nameInput).toHaveAttribute("name", "name");
      expect(nameInput).toHaveAttribute("value", "");
      expect(nameInput).toBeRequired();
    });

    // component render with provided success message when isSuccess is true (default)
    test("render with provided success message when isSuccess is true (default)", () => {
      const onChangeFunction = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        ([] as ChangeEvent<HTMLInputElement | HTMLSelectElement>[]).push(evt);
      };

      render(
        <FormField
          showMessage={true}
          msgSuccess="Sign up succesful"
          fieldValue=""
          onChangeFunc={onChangeFunction}
        />,
      );

      const formField = screen.getByRole("formfield");
      expect(within(formField).queryByText("Sign up succesful")).toBeInTheDocument();
      expect(
        within(formField).queryByText("Oops! Username already taken!"),
      ).not.toBeInTheDocument();

      const nameInput = within(formField).getByLabelText("Name");
      expect(nameInput).toHaveAttribute("placeholder", "Enter your name");
      expect(nameInput).toHaveAttribute("type", "text");
      expect(nameInput).toHaveAttribute("id", "name");
      expect(nameInput).toHaveAttribute("name", "name");
      expect(nameInput).toHaveAttribute("value", "");
      expect(nameInput).toBeRequired();
    });

    // component render with default error message when isSuccess is false
    test("render with default error message when isSuccess is false", () => {
      const onChangeFunction = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        ([] as ChangeEvent<HTMLInputElement | HTMLSelectElement>[]).push(evt);
      };

      render(
        <FormField
          showMessage={true}
          isSuccess={false}
          fieldValue=""
          onChangeFunc={onChangeFunction}
        />,
      );

      const formField = screen.getByRole("formfield");
      expect(within(formField).queryByText("Alright! Username available!")).not.toBeInTheDocument();
      expect(within(formField).queryByText("Oops! Username already taken!")).toBeInTheDocument();

      const nameInput = within(formField).getByLabelText("Name");
      expect(nameInput).toHaveAttribute("placeholder", "Enter your name");
      expect(nameInput).toHaveAttribute("type", "text");
      expect(nameInput).toHaveAttribute("id", "name");
      expect(nameInput).toHaveAttribute("name", "name");
      expect(nameInput).toHaveAttribute("value", "");
      expect(nameInput).toBeRequired();
    });

    // component render with provided error message when isSuccess is false
    test("render with provided error message when isSuccess is false", () => {
      const onChangeFunction = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        ([] as ChangeEvent<HTMLInputElement | HTMLSelectElement>[]).push(evt);
      };

      render(
        <FormField
          showMessage={true}
          isSuccess={false}
          msgError="Something went wrong!!!"
          fieldValue=""
          onChangeFunc={onChangeFunction}
        />,
      );

      const formField = screen.getByRole("formfield");
      expect(within(formField).queryByText("Alright! Username available!")).not.toBeInTheDocument();
      expect(within(formField).queryByText("Something went wrong!!!")).toBeInTheDocument();

      const nameInput = within(formField).getByLabelText("Name");
      expect(nameInput).toHaveAttribute("placeholder", "Enter your name");
      expect(nameInput).toHaveAttribute("type", "text");
      expect(nameInput).toHaveAttribute("id", "name");
      expect(nameInput).toHaveAttribute("name", "name");
      expect(nameInput).toHaveAttribute("value", "");
      expect(nameInput).toBeRequired();
    });
  });
});
