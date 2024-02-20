import { useDispatch, useSelector } from "../../hooks";
import Board from "../Board/Board";
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import { startNewGame } from "../../features/hexagon/hexagonThunks";
import Button from "../Button/Button";
import "./Game.css";
const Game = () => {
  const tiles = useSelector((state: RootState) => state.hexagon.tiles);
  const dispatch = useDispatch();
  const [gameStatus, setGameStatus] = useState("playing");

  useEffect(() => {
    const checkForSameValueTiles = () => {
      const values = tiles.map((tile) => tile.value);
      const uniqueValues = new Set(values);

      // Check for tiles with the same value
      let hasSameAdjacentValue = false;

      for (let i = 0; i < tiles.length; i++) {
        for (let j = i + 1; j < tiles.length; j++) {
          // if tiles are adjacent
          if (tiles[i].value === tiles[j].value) {
            hasSameAdjacentValue = true;
            break;
          }
        }
        if (hasSameAdjacentValue) break;
      }

      if (!hasSameAdjacentValue && uniqueValues.size === values.length) {
        setGameStatus("game-over");
      } else {
        setGameStatus("playing");
      }
    };

    checkForSameValueTiles();
  }, [tiles]);

  const handleStartNewGame = () => {
    dispatch(startNewGame());
  };

  return (
    <div data-status={gameStatus} className="game-container">
      <Board />
      <div className="game-status-contaier">
        <p className="status-message">{gameStatus}</p>
        <Button onClick={handleStartNewGame}>New Game</Button>
      </div>
    </div>
  );
};

export default Game;
