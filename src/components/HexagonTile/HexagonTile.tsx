import React from "react";
import HexagonBase from "../../svg/HexagonBase/HexagonBase";
import Hexagon from "../../svg/Hexagon/Hexagon"; // Ensure this import is correct
import { useSelector } from "../../hooks";
import { RootState } from "../../store";
interface HexagonTileProps {
  xIndex: number;
  yIndex: number;
  zIndex: number;
}
const HexagonTile: React.FC<HexagonTileProps> = ({
  xIndex,
  yIndex,
  zIndex,
}) => {
  const hexSize = 86; // This represents the distance from the center to any corner.
  const hexWidth = hexSize * Math.sqrt(3);
  const hexHeight = hexSize * 2;

  const getPixelPosition = (x: number, y: number) => {
    // Adjusting to center the hexagon board in the middle of the screen
    const boardCenterX = window.innerWidth / 2;
    const boardCenterY = window.innerHeight / 2;

    // Calculate the relative position from the center of the board
    const relX = x * (hexWidth * 0.73);
    const relY = (y % 2 === 0 ? y : -y) * (hexHeight * 0.75);

    // Adjust the y-position for staggered arrangement
    let offsetY = 0;
    if (x === -1) {
      // For tiles with x: 1, adjust the y position to match the height of tiles with x: -1
      offsetY = hexHeight * 0.375;
    }
    if (x === 1) {
      // For tiles with x: 1, adjust the y position to match the height of tiles with x: -1
      offsetY = hexHeight - 235;
    }

    return { x: boardCenterX + relX, y: boardCenterY + relY + offsetY };
  };

  const { x, y } = getPixelPosition(xIndex, yIndex);

  const tileStyle: React.CSSProperties = {
    position: "absolute",
    left: `${x - 750}px`,
    top: `${y - 100}px`,
    transform: "translate(-10%, -10%)", // Center the hexagon
    width: `${hexWidth}px`,
    height: `${hexHeight}px`,
  };

  const isOverlay = useSelector((state: RootState) =>
    state.hexagon.tiles.some((tile) => tile.x === xIndex && tile.y === yIndex)
  );

  return (
    <div data-testid="hexagon-tile" style={tileStyle}>
      <HexagonBase
        x={xIndex}
        y={yIndex}
        z={zIndex}
        overlayColor="#B5A89B"
        innerColor="none"
      />
      {isOverlay && (
        <Hexagon
          data-testid={`hexagon-overlay`}
          x={xIndex}
          y={yIndex}
          z={zIndex}
        />
      )}
    </div>
  );
};

export default HexagonTile;
