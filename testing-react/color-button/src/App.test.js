import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("button has correct inital color", () => {
  render(<App />);
  // find an element with role
  const colorButton = screen.getByRole("button", { name: "change to blue" });
  // expect the bg color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  expect(colorButton.textContent).toBe("change to red");
});
// test("button has correct inital text", () => {});ﬂ
// test("button tunrs blue when clicked", () => {
//   render(<App />);

//   const colorButton = screen.getByRole("button", { name: "change to  blue" });
// });

test("inital conditions", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "change to blue" });
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
