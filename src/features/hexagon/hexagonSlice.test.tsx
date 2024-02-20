import hexagonReducer, {
  removeTile,
  updateTiles,
  resetGame,
} from "./hexagonSlice";
import { Tile } from "../../types/types";

describe("hexagonSlice reducer", () => {
  const initialState = {
    baseTile: [],
    tiles: [],
    overlayPositions: [],
    gameData: null,
    loading: false,
    error: null,
  };

  it("should handle initial state", () => {
    expect(hexagonReducer(undefined, { type: "unknown" })).toEqual({
      baseTile: [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 1, z: -1 },
        { x: 0, y: -1, z: 1 },
        { x: -1, y: 1, z: 0 },
        { x: 1, y: 0, z: -1 },
        { x: -1, y: 0, z: 1 },
        { x: 1, y: -1, z: 0 },
      ],
      error: null,
      gameData: null,
      loading: false,
      overlayPositions: [],
      tiles: [],
    });
  });

  it("should handle removeTile", () => {
    const startState = {
      ...initialState,
      tiles: [
        { x: 0, y: 0, z: 0, value: 2 },
        { x: 1, y: 1, z: 0, value: 4 },
      ],
    };
    const expectedState = {
      ...initialState,
      tiles: [{ x: 1, y: 1, z: 0, value: 4 }],
    };
    const action = removeTile({ x: 0, y: 0, z: 0 });
    expect(hexagonReducer(startState, action)).toEqual(expectedState);
  });

  it("should handle updateTiles", () => {
    const startState = {
      ...initialState,
      tiles: [{ x: 0, y: 0, z: 0, value: 2 }],
    };
    const updatedTiles: Tile[] = [{ x: 0, y: 0, z: 0, value: 4 }];
    const action = updateTiles(updatedTiles);
    expect(hexagonReducer(startState, action)).toEqual({
      ...initialState,
      tiles: updatedTiles,
    });
  });

  it("should handle resetGame", () => {
    const startState = {
      ...initialState,
      tiles: [{ x: 0, y: 0, z: 0, value: 2 }],
    };
    expect(hexagonReducer(startState, resetGame())).toEqual(initialState);
  });
});
