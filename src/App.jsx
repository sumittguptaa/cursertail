import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cursorPositions, setCursorPositions] = useState([]);

  useEffect(() => {
    function handleMouseMove(event) {
      setCursorPositions((prevPositions) => [
        ...prevPositions,
        { x: event.clientX, y: event.clientY },
      ]);
    }

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCursorPositions((prevPositions) => prevPositions.slice(1));
    }, 40);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cursorPositions]);

  return (
    <div>
      {cursorPositions.map((position, index) => (
        <div
          key={index}
          className="circle"
          style={{
            position: "absolute",
            left: `${position.x - 7.5}px`,
            top: `${position.y - 7.5}px`,
            opacity: 1 - index / cursorPositions.length,
          }}
        ></div>
      ))}
    </div>
  );
}

export default App;

