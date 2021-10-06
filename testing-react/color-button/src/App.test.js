import { fireEvent, render, screen } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("button has correct inital color", () => {
  render(<App />);
  // find an element with role
  const colorButton = screen.getByRole("button", {
    name: "change to MidnightBlue",
  });
  // expect the bg color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  expect(colorButton.textContent).toBe("change to MediumVioletRed");
});
// test("button has correct inital text", () => {});ﬂ
// test("button tunrs blue when clicked", () => {
//   render(<App />);

//   const colorButton = screen.getByRole("button", { name: "change to  blue" });
// });

test("inital conditions", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "change to MidnightBlue",
  });
  expect(colorButton).toBeEnabled();

  // check tthat the checkbox start out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("should disable the button if checkbox is checked", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "disable button" });
  const button = screen.getByRole("button");

  expect(checkbox).not.toBeChecked();

  expect(button).toBeEnabled();

  fireEvent.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(button).not.toBeEnabled();
});

test("should change button to gray when is disabled", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "disable button" });
  const button = screen.getByRole("button");

  expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });
});

test("clicked disabled button hsa gray bg and revert to blue", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "disable button" });
  const button = screen.getByRole("button", { name: "change to MidnightBlue" });

  fireEvent.click(button);

  // check the checkbox
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("from camelcase to spaces", () => {
  test("should not work with not inner capital letter", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("should work with one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("should work with multple inner capital letter", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
