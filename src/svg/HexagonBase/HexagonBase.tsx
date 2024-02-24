// CodeScreen\src\svg\HexagonBase\HexagonBase.tsx

import React from "react";

interface HexagonBaseProps {
  y: number;
  x: number;
  z: number;
  overlayColor?: string; // Color of the hexagon border
  innerColor?: string; // Color of the inner circle
  style?: React.CSSProperties; // Additional styles
}

const HexagonBase: React.FC<HexagonBaseProps> = ({
  overlayColor = "#B5A89B",
  innerColor = "none",
}) => {
  return (
    <div
      style={{
        position: "absolute", // Ensure hexagon is positioned absolutely within its parent container
        width: "100%",
        height: "100%",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 200 174"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 86.836L.65 84.371a5 5 0 00.028 4.979L5 86.836zM52.325 168.2l-4.322 2.514a5 5 0 004.322 2.486v-5zM51.371 5V0a5 5 0 00-4.35 2.535L51.37 5zm97.386 163.2v5c1.794 0 3.45-.961 4.34-2.518l-4.34-2.482zM147.802 5l4.337-2.487A5 5 0 00147.802 0v5zM195 87.31l4.341 2.48c.88-1.539.879-3.43-.004-4.968L195 87.31zM.678 89.35l47.325 81.364 8.645-5.028L9.322 84.322.678 89.35zm8.672-.05L55.72 7.466l-8.7-4.93L.65 84.371l8.7 4.93zm42.975 83.9h96.432v-10H52.326v10zM51.371 10h96.431V0H51.371v10zm139.288 74.828l-46.243 80.89 8.681 4.964 46.244-80.891-8.682-4.963zm8.678-.006l-47.198-82.31-8.675 4.975 47.199 82.31 8.674-4.975z"
          fill={overlayColor}
        />
        <circle cx="100" cy="87" r="30" fill={innerColor} />
      </svg>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "black",
          fontWeight: "bold",
          pointerEvents: "none",
        }}
      >
        {/* {`x:${x},y:${y},z:${z}`} */}
      </div>
    </div>
  );
};

export default HexagonBase;
