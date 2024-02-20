import React, { useEffect, useState } from "react";
import { useSelector } from "../../hooks";
import "./Score.css";
import { RootState } from "../../store";

const Score: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const tiles = useSelector((state: RootState) => state.hexagon.tiles);
  // Calculate the current score as the highest tile value
  const score = Math.max(...tiles.map((tile) => tile.value), 0);
  const [bestScore, setBestScore] = useState(() => {
    const storedBestScore = localStorage.getItem("bestScore");
    return storedBestScore ? parseInt(storedBestScore, 10) : 0;
  });

  useEffect(() => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem("bestScore", score.toString());
    }
  }, [score, bestScore]);

  useEffect(() => {
    if (score > 2) {
      setIsVisible(true);
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [score]);

  return (
    <div className="scores-container">
      <div className="score-container">
        {isVisible && <div className="score-popup">+{score / 2}</div>}
        <div className="score-label">Score: {score}</div>
      </div>
      <div className="best-container">Best: {bestScore}</div>
    </div>
  );
};

export default Score;
