import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchGameData,
  generateGameData,
  updateTilesMovement,
} from "./hexagonThunks";
import { BaseTile, ServerTile, Tile } from "../../types/types";

export interface HexagonState {
  baseTile: BaseTile[];
  tiles: Tile[];
  overlayPositions: Tile[];
  //gameData: any;
  loading: boolean;
  error: string | null;
}

const initialState: HexagonState = {
  baseTile: [
    { x: 0, y: 0, z: 0 }, // Center tile
    { x: 0, y: 1, z: -1 }, // Top
    { x: 0, y: -1, z: 1 }, // Bottom
    { x: -1, y: 1, z: 0 }, // Top left
    { x: 1, y: 0, z: -1 }, // Top right
    { x: -1, y: 0, z: 1 }, // Bottom left
    { x: 1, y: -1, z: 0 }, // Bottom right
  ],
  tiles: [],
  overlayPositions: [],
  //gameData: null,
  loading: false,
  error: null,
};

export const hexagonSlice = createSlice({
  name: "hexagon",
  initialState,
  reducers: {
    removeTile(
      state,
      action: PayloadAction<{ x: number; y: number; z: number }>
    ) {
      state.tiles = state.tiles.filter(
        (tile) => tile.x !== action.payload.x || tile.y !== action.payload.y
      );
    },
    updateTiles(state, action: PayloadAction<Tile[]>) {
      state.tiles = action.payload;
    },
    resetGame: (state) => {
      state.tiles = [];
    }, //There was Generate reducer also but because of using server generator it has been removed.
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGameData.pending, (state) => {
        //Begin of fetchGameData for initial data fetch
        state.loading = true;
      })
      .addCase(
        fetchGameData.fulfilled,
        (state, action: PayloadAction<ServerTile[]>) => {
          state.loading = false;
          state.tiles = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unexpected error occurred";
      }) //End of fetchGameData for initial data fetch
      .addCase(generateGameData.pending, (state) => {
        //Begin of generateGameData for generating data fetch
        state.loading = true;
      })
      .addCase(
        generateGameData.fulfilled,
        (state, action: PayloadAction<ServerTile[]>) => {
          state.loading = false;
          state.error = null;

          state.loading = false;
          const existingTileIndex = state.tiles.findIndex(
            (tile) =>
              tile.x === action.payload[0].x && tile.y === action.payload[0].y
          );
          if (existingTileIndex === -1) {
            // If the tile doesn't exist, add it
            state.tiles.push({
              x: action.payload[0].x,
              y: action.payload[0].y,
              z: action.payload[0].z,
              value: 2,
            });
          }
          state.error = null;
        }
      )
      .addCase(generateGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unexpected error occurred";
      }) //End of generateGameData for generating data fetch
      .addCase(updateTilesMovement.pending, (state) => {
        //fetch is not working !
        state.loading = true;
      })
      .addCase(
        updateTilesMovement.fulfilled,
        (state, action: PayloadAction<ServerTile[]>) => {
          state.loading = false;
          state.error = null;
          state.tiles = action.payload;
        }
      )
      .addCase(updateTilesMovement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An unexpected error occurred";
      });
  },
});

export const { removeTile, updateTiles, resetGame } = hexagonSlice.actions;
export default hexagonSlice.reducer;
