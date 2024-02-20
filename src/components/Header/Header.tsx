import React from "react";
import Score from "../Score/Score";
import "./Header.css";
const Header: React.FC = () => {
  return (
    <header className="header-container">
      <h1 className="title">2048</h1>
      <Score />
    </header>
  );
};

export default Header;
