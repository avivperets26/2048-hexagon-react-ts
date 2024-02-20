import React, { useEffect, useState } from "react";
import { useSelector } from "../../hooks";
import { RootState } from "../../store";
import "./hexagon.css";
interface HexagonProps {
  y: number;
  x: number;
  z: number;
  style?: React.CSSProperties;
}

// Function to map value to color
const getColorForValue = (value: number): string => {
  const colors: Record<number, string> = {
    2: "#eee4df",
    4: "#ede0c8",
    8: "#f2b179",
    16: "#f59563",
    32: "#f67c5f",
    64: "#f65e3b",
    128: "#edcf72",
    256: "#edcc61",
    512: "#edc850",
    1024: "#edc53f",
    2048: "#edc22e",
  };
  return colors[value] || "#8f7a66"; // Default color if value does not match
};

const Hexagon: React.FC<HexagonProps> = ({ x, y, z }) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const value = useSelector(
    (state: RootState) =>
      state.hexagon.tiles.find((tile) => tile.x === x && tile.y === y)?.value ??
      0
  );

  // Effect to reset animation state after animation ends
  useEffect(() => {
    const onAnimationEnd = () => {
      setShouldAnimate(false);
    };
    const element = document.getElementById(`hexagon-${x}-${y}-${z}`);
    if (element) {
      element.addEventListener("animationend", onAnimationEnd);
      return () => {
        element.removeEventListener("animationend", onAnimationEnd);
      };
    }
  }, [x, y, z]);

  // Effect to trigger animation when value changes
  useEffect(() => {
    setShouldAnimate(true); // Trigger animation when value changes
  }, [value]);

  // Dependency array ensures effect runs only when `isNew` changes
  const hexagonStyle: React.CSSProperties = {
    position: "absolute", // Ensure hexagon is positioned absolutely within its parent container
    width: "90%",
    height: "90%",
    left: "8px",
    top: "9px",
  };

  // Add a class to the hexagon tile to trigger animation
  const tileClass = shouldAnimate ? "hexagon-tile popup" : "hexagon-tile";

  return (
    <div
      data-testid={`hexagon-${x}-${y}-${z}`}
      id={`hexagon-${x}-${y}-${z}`}
      className={`hexagon_tile_container ${tileClass}`}
      data-x={x}
      data-y={y}
      data-z={z}
      data-value={value}
      style={hexagonStyle}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 190 164"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M47.3255 163.2L0 81.836L46.3707 0H142.802L190 82.3093L143.757 163.2H47.3255Z"
          fill={getColorForValue(value)} // Fill color for the hexagon
        ></path>
      </svg>
      <span
        style={{
          position: "absolute",
          color: "black",
          fontWeight: "bold",
          fontSize: "1em", //1.5em
          transform: "translate(-50%, -50%)", // Center the text inside the hexagon
          top: "50%",
          left: "50%",
        }}
      >
        {value}
        {/* {`x:${x},y:${y}, z:${z}, value:${value}`} */}
      </span>
    </div>
  );
};

export default Hexagon;
