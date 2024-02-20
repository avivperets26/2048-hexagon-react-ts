import React, { useEffect } from "react";
import { Tile } from "../../types/types";
import { useDispatch, useSelector } from "../../hooks";
import { RootState } from "../../store";
import { updateAndGenerateTile } from "../../features/hexagon/hexagonThunks";

const Controllers: React.FC = () => {
  const dispatch = useDispatch();
  const tiles = useSelector((state: RootState) => state.hexagon.tiles);
  const SpecificPositions = useSelector(
    (state: RootState) => state.hexagon.baseTile
  );
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (!["w", "s", "q", "e", "a", "d"].includes(key)) return;
      // Prepare the data to send to the server based on the key press
      const updatedTilesPositions = calculateAndUpdatePositions(tiles, key);
      if (!updatedTilesPositions.length) return; // If no movement is possible, do nothing
      dispatch(updateAndGenerateTile(updatedTilesPositions));
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [tiles, dispatch]);

  //check if a position is valid
  const isValidPosition = (x: number, y: number) =>
    SpecificPositions.some((pos) => pos.x === x && pos.y === y);

  function calculateAndUpdatePositions(
    tiles: Tile[],
    direction: string
  ): Tile[] {
    // Attempt to move tiles and calculate new positions
    const movedTiles = tiles
      .map((tile) => calculateNewPosition(tile, direction))
      .filter((tile) => tile !== undefined) as Tile[]; // Filter out undefined values

    // Filter out invalid positions
    const validMovedTiles = movedTiles.filter(
      (tile) => tile !== undefined
    ) as Tile[];

    const resolvedTiles = resolveCollisionsAndMerge(validMovedTiles, direction); //Handling Tile Collide

    return resolvedTiles;
  }

  //Handle Collisions based on the logic and merge values or removing tiles
  function resolveCollisionsAndMerge(tiles: Tile[], direction: string): Tile[] {
    let updatedTiles = [...tiles]; // Clone the array to avoid direct modification during iteration
    const mergedIndices: Set<number> = new Set(); // Track indices of tiles to merge

    const getComparisonFunction = (tileA: Tile, tileB: Tile): boolean => {
      if (direction === "w" || direction === "s") {
        return tileA.x === tileB.x;
      } else if (direction === "e" || direction === "a") {
        return tileA.y === tileB.y;
      } else if (direction === "q" || direction === "d") {
        return tileA.z === tileB.z;
      }
      return false;
    };

    const getValueSum = (tileA: Tile, tileB: Tile): number => {
      return direction === "d" || direction === "a"
        ? tileA.value + tileB.value
        : tileB.value + tileA.value;
    };

    updatedTiles = updatedTiles.sort((a, b) => {
      if (direction === "w" || direction === "s") return a.x - b.x;
      else if (direction === "e" || direction === "a") return a.y - b.y;
      else if (direction === "q" || direction === "d") return a.z - b.z;
      return 0;
    });

    for (let i = 0; i < updatedTiles.length - 1; i++) {
      if (mergedIndices.has(i)) continue; // Skip tiles already processed for merging

      if (
        getComparisonFunction(updatedTiles[i], updatedTiles[i + 1]) &&
        updatedTiles[i].value === updatedTiles[i + 1].value &&
        !mergedIndices.has(i)
      ) {
        // Merge tile i+1 into tile i by summing their values
        updatedTiles[i] = {
          ...updatedTiles[i + 1],
          value: getValueSum(updatedTiles[i], updatedTiles[i + 1]),
        };
        mergedIndices.add(i + 1); // Mark tile i+1 for removal after merging
      }
    }

    // Filter out the merged tiles based on their indices
    updatedTiles = updatedTiles.filter((_, index) => !mergedIndices.has(index));

    return updatedTiles;
  }

  function findTileAtPosition(
    tiles: Tile[],
    position: { x: number; y: number; z: number }
  ): Tile | undefined {
    return tiles.find(
      (tile) =>
        tile.x === position.x && tile.y === position.y && tile.z === position.z
    );
  }

  //Calculate position based on key
  function calculateNewPosition(
    tile: Tile,
    direction: string
  ): Tile | undefined {
    let { x, y, z } = tile;
    let nextPos = { x, y, z };
    let prevPos = { ...nextPos }; // Keep track of the previous position

    const getNextPosition = (pos: { x: number; y: number; z: number }) => {
      switch (direction) {
        case "w":
          return { ...pos, y: pos.y + 1, z: pos.z - 1 };
        case "s":
          return { ...pos, y: pos.y - 1, z: pos.z + 1 };
        case "q":
          return { ...pos, x: pos.x - 1, y: pos.y + 1 };
        case "e":
          return { ...pos, x: pos.x + 1, z: pos.z - 1 };
        case "a":
          return { ...pos, x: pos.x - 1, z: pos.z + 1 };
        case "d":
          return { ...pos, x: pos.x + 1, y: pos.y - 1 };
        default:
          return pos; // Invalid direction
      }
    };

    // Check the next position before moving there
    let nextPotentialPos = getNextPosition(nextPos);
    while (
      isValidPosition(nextPotentialPos.x, nextPotentialPos.y) &&
      !findTileAtPosition(tiles, nextPotentialPos)
    ) {
      prevPos = { ...nextPos }; // Update previous position before moving
      nextPos = getNextPosition(nextPos); // Move to next position
      nextPotentialPos = getNextPosition(nextPos); // Prepare the next potential position
    }

    // Handling the case where the next position is occupied
    const blockingTile = findTileAtPosition(tiles, nextPotentialPos);
    if (blockingTile && blockingTile.value !== tile.value) {
      // If the next position is occupied by a tile with a different value, stop at the current position
      return { ...tile, x: prevPos.x, y: prevPos.y, z: prevPos.z };
    }

    return isValidPosition(nextPos.x, nextPos.y)
      ? { ...tile, x: nextPos.x, y: nextPos.y, z: nextPos.z }
      : undefined;
  }

  return null;
};

export default Controllers;
