// CodeScreen\src\components\Board\Board.tsx
import React, { useEffect } from "react";
import HexagonTile from "../HexagonTile/HexagonTile";
import Controllers from "../Controllers/Controllers";
import { useDispatch, useSelector } from "../../hooks";
import { fetchGameData } from "../../features/hexagon/hexagonThunks";
import { RootState } from "../../store";
import "./Board.css";
const Board: React.FC = () => {
  const dispatch = useDispatch();
  const tiles = useSelector((state: RootState) => state.hexagon.baseTile);

  useEffect(() => {
    dispatch(fetchGameData({ radius: 2 }));
  }, [dispatch]);
  return (
    <div
      className="board-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="hexagon-grid" data-testid="hexagon-grid">
        {tiles.map((tile, index) => (
          <HexagonTile
            key={index}
            xIndex={tile.x}
            yIndex={tile.y}
            zIndex={tile.z}
          />
        ))}
      </div>
      <Controllers />
    </div>
  );
};

export default Board;
