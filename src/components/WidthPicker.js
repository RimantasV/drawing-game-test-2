import React from "react";
import colors from "../utils/colors";

export default function WidthPicker({ setLineWidth }) {
  const widths = [5, 10, 15, 20];
  function handleWidthPick(width) {
    setLineWidth(width);
  }

  return (
    <div className="width-picker">
      {widths.map((width) => {
        return (
          <div
            className="width-square"
            style={{ border: `1px solid black` }}
            key={width}
            onClick={() => handleWidthPick(width)}
          >
            <div
              className="circle"
              style={{ width: `${width}px`, height: `${width}px` }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
