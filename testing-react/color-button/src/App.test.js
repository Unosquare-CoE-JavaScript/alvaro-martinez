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
