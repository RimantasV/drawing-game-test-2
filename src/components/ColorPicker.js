import React from "react";
import colors from "../utils/colors";

export default function ColorPicker({ setDrawColor }) {
  function handleColorPick(color) {
    setDrawColor(color);
  }

  return (
    <div className="color-picker">
      {colors.map((color) => {
        return (
          <div
            className="color-square"
            style={{ backgroundColor: `${color}` }}
            key={color}
            onClick={() => handleColorPick(color)}
          ></div>
        );
      })}
    </div>
  );
}
