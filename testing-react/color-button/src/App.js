import { useState } from "react";
import "./App.css";

export function replaceCamelWithSpaces(colorName) {
  return colorName.replace(/\B([A-Z])\B/g, " $1");
}

function App() {
  const [buttonColor, setButtonColor] = useState("red");
  const [disabled, setDisabled] = useState(false);

  const newButtonColor = buttonColor === "red" ? "blue" : "red";

  return (
    <div className="">
      <button
        style={{ backgroundColor: disabled ? "gray" : buttonColor }}
        onClick={() => setButtonColor(newButtonColor)}
        disabled={disabled}
      >
        change to {newButtonColor}
      </button>
      <input
        id="disable-button-checkbox"
        aria-checked={disabled}
        type="checkbox"
        defaultChecked={false}
        onChange={() => setDisabled(!disabled)}
      ></input>
      <label htmlFor="disable-button-checkbox">disable button</label>
    </div>
  );
}

export default App;
