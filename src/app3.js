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
//   const [current, setCurrent] = useState({ x: null, y: null });
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

//   socket.on("drawing", onDrawingEvent);

//   function drawLine(x0, y0, x1, y1, color, emit) {
//     console.log(x0, y0, x1, y1, color, emit);
//     contextRef.current.beginPath();
//     contextRef.current.moveTo(x0, y0);
//     contextRef.current.lineTo(x1, y1);
//     contextRef.current.strokeStyle = color;
//     contextRef.current.lineWidth = 2;
//     contextRef.current.stroke();
//     contextRef.current.closePath();

//     if (!emit) {
//       return;
//     }
//     var w = canvasRef.current.width;
//     var h = canvasRef.current.height;

//     socket.emit("drawing", {
//       x0: x0 / w,
//       y0: y0 / h,
//       x1: x1 / w,
//       y1: y1 / h,
//       color: drawColor
//     });
//   }

//   function onMouseDown(e) {
//     setIsDrawng(true);
//     current.x = e.clientX || e.touches[0].clientX;
//     current.y = e.clientY || e.touches[0].clientY;
//   }

//   function onMouseUp(e) {
//     if (!isdrawing) {
//       return;
//     }
//     setIsDrawng(false);
//     drawLine(
//       current.x,
//       current.y,
//       e.clientX || e.touches[0].clientX,
//       e.clientY || e.touches[0].clientY,
//       current.color,
//       true
//     );
//   }

//   function onMouseMove(e) {
//     if (!isdrawing) {
//       return;
//     }
//     drawLine(
//       current.x,
//       current.y,
//       e.clientX || e.touches[0].clientX,
//       e.clientY || e.touches[0].clientY,
//       current.color,
//       true
//     );
//     current.x = e.clientX || e.touches[0].clientX;
//     current.y = e.clientY || e.touches[0].clientY;
//   }

//   // limit the number of events per second
//   function throttle(callback, delay) {
//     var previousCall = new Date().getTime();
//     console.log("throttle");
//     return function () {
//       var time = new Date().getTime();

//       if (time - previousCall >= delay) {
//         previousCall = time;
//         callback.apply(null, arguments);
//       }
//     };
//   }

//   function onDrawingEvent(data) {
//     var w = canvasRef.current.width;
//     var h = canvasRef.current.height;
//     drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
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
//         onMouseDown={onMouseDown}
//         onMouseUp={onMouseUp}
//         onMouseMove={throttle(onMouseMove, 100)}
//         ref={canvasRef}
//       />
//       <ColorPicker setDrawColor={setDrawColor} />
//       <WidthPicker setLineWidth={setLineWidth} />
//       <div className="clear-canvas" onClick={handleClearCanvas}></div>
//     </div>
//   );
// }
