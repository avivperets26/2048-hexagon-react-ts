import React, { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Define default and hover styles
  const defaultStyle: React.CSSProperties = {
    cursor: "pointer",
    padding: "10px 20px",
    marginLeft: "0px",
    fontSize: "16px",
    background: "#bbada0",
    borderColor: "white",
    display: "inline-block",
    lineHeight: "25px",
    fontWeight: "bold",
    borderRadius: "3px",
    color: "white",
    textAlign: "center",
    height: "70px",
    textOverflow: "ellipsis",
    transition: "background-color 0.3s", // Smooth transition for background color
  };
  const hoverStyle = {
    ...defaultStyle,
    background: "#8f7a66", // Darker shade when hovered
  };

  return (
    <button
      className="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={isHovered ? hoverStyle : defaultStyle}
    >
      {children}
    </button>
  );
};

export default Button;
