import React, { useEffect, useRef, useState } from "react";
// import ColorPicker from "./components/ColorPicker";
// import WidthPicker from "./components/WidthPicker";
import "./styles.css";
import { io } from "socket.io-client";

export default function App() {
  const socket = io("https://amused-lively-shad.glitch.me/");
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth / 2; //* 2;
    canvas.height = window.innerHeight / 2; //* 2;
    // canvas.style.width = `${window.innerWidth/2}px`;
    // canvas.style.height = `${window.innerHeight/2}px`;

    const context = canvas.getContext("2d");
    // context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  socket.on("startDrawing", onStartDrawingEvent);

  function onStartDrawingEvent(data) {
    console.log(data.x0);
    // const xxx = data.x0;
    // const yyy = data.y0;
    // contextRef.current.beginPath();
    // contextRef.current.moveTo(xxx, yyy);
  }

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    socket.emit("startDrawing", {
      x0: offsetX,
      y0: offsetY
    });
    // console.log(offsetX, offsetY);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };
  const handleClearCanvas = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };
  return (
    <div className="App">
      <canvas
        style={{ border: "1px solid red" }}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      {/* <ColorPicker setDrawColor={setDrawColor} /> */}
      {/* <WidthPicker setLineWidth={setLineWidth} /> */}
      <div className="clear-canvas" onClick={handleClearCanvas}></div>
    </div>
  );
}
