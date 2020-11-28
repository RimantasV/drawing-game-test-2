// import React, { useEffect, useRef, useState } from "react";
// import ColorPicker from "./components/ColorPicker";
// import WidthPicker from "./components/WidthPicker";
// import "./styles.css";
// import { io } from "socket.io-client";

// export default function App() {
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);
//   const [isdrawing, setIsDrawng] = useState(false);
//   const [drawColor, setDrawColor] = useState("black");
//   const [lineWidth, setLineWidth] = useState(5);
//   // const socket = io("https://5oqzn.sse.codesandbox.io/");
//   const socket = io("https://navy-pale-coast.glitch.me/");
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth / 2;
//     canvas.height = window.innerHeight / 2;
//     // canvas.style.width = `${window.innerWidth}px`;
//     // canvas.style.height = `${window.innerHeight}px`;
//     const context = canvas.getContext("2d");
//     // context.scale(2, 2);
//     context.lineCap = "round";
//     // context.strokeStyle = "black";
//     context.lineWidth = 5;
//     contextRef.current = context;
//   }, []);

//   const startDrawing = ({ nativeEvent }) => {
//     const { offsetX, offsetY } = nativeEvent;
//     contextRef.current.strokeStyle = drawColor;
//     contextRef.current.lineWidth = lineWidth;
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(offsetX, offsetY);
//     setIsDrawng(true);
//   };

//   const finishDrawing = () => {
//     contextRef.current.beginPath();
//     setIsDrawng(false);
//   };

//   const draw = ({ nativeEvent }) => {
//     if (!isdrawing) {
//       return;
//     }
//     const {
//       // offsetX,
//       // offsetY,
//       clientX,
//       clientY,
//       movementX,
//       movementY
//     } = nativeEvent;
//     // console.log(nativeEvent);
//     // contextRef.current.lineTo(offsetX, offsetY);
//     // contextRef.current.stroke();
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(clientX - movementX, clientY - movementY);
//     contextRef.current.lineTo(clientX, clientY);
//     contextRef.current.strokeStyle = drawColor;
//     contextRef.current.lineWidth = 2;
//     contextRef.current.stroke();
//     contextRef.current.closePath();

//     socket.emit("drawing", {
//       // x0: x0 / w,
//       // y0: y0 / h,
//       // x1: x1 / w,
//       // y1: y1 / h,
//       x0: clientX - movementX,
//       y0: clientY - movementY,
//       x1: clientX, //offsetX,
//       y1: clientY, //offsetY,
//       color: drawColor
//       // drawing: "test"
//     });
//   };

//   socket.on("drawing", onDrawingEvent);

//   function onDrawingEvent(data) {
//     // console.log(data);
//     // // var w = canvas.width;
//     // // var h = canvas.height;
//     // // drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
//     // // drawLine(data.x0, data.y0, data.x1, data.y1, data.color);
//     // contextRef.current.beginPath();
//     // contextRef.current.moveTo(data.x0, data.y0);
//     // contextRef.current.lineTo(data.x1, data.y1);
//     // contextRef.current.strokeStyle = data.color;
//     // contextRef.current.lineWidth = 2;
//     // contextRef.current.stroke();
//     // contextRef.current.closePath();
//   }

//   const handleClearCanvas = () => {
//     contextRef.current.clearRect(
//       0,
//       0,
//       canvasRef.current.width,
//       canvasRef.current.height
//     );
//   };
//   return (
//     <div className="App">
//       <canvas
//         style={{ border: "1px solid red" }}
//         onMouseDown={startDrawing}
//         onMouseUp={finishDrawing}
//         onMouseMove={draw}
//         ref={canvasRef}
//       />
//       <ColorPicker setDrawColor={setDrawColor} />
//       <WidthPicker setLineWidth={setLineWidth} />
//       <div className="clear-canvas" onClick={handleClearCanvas}></div>
//     </div>
//   );
// }
