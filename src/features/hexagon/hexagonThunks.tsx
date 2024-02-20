import { createAsyncThunk } from "@reduxjs/toolkit";
import { MovementRequest, ServerTile, Tile } from "../../types/types";
import { RootState } from "../../store";
import { hexagonSlice, removeTile, updateTiles } from "./hexagonSlice";

// Define a thunk for fetching game data

//Fetching data from server on init
export const fetchGameData = createAsyncThunk(
  "hexagon/fetchGameData",
  async ({ radius }: { radius: number }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://hex2048-lambda.octa.wtf/${radius}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([]), // Initial payload
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data: ServerTile[] = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

//Fetching a request for generate tiles data
export const generateGameData = createAsyncThunk(
  "hexagon/generateGameData",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState; // Ensure type cast to RootState if using TypeScript
      const tiles = state.hexagon.tiles; // Access the tiles directly from the state
      const response = await fetch("https://hex2048-lambda.octa.wtf/2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tiles),
      });
      if (!response.ok) throw new Error("Network response was not ok");

      const data: ServerTile[] = await response.json();
      return data;
    } catch (error) {
      console.log(`error:${error}`);
      return rejectWithValue((error as Error).message);
    }
  }
);

// This fetch request is not working, by README description was supposed to send array of tiles and key and get tiles after movement calculated. instead it will be calculated from the client side.
export const updateTilesMovement = createAsyncThunk<
  ServerTile[],
  MovementRequest,
  { state: RootState }
>(
  "hexagon/updateTilesMovement",
  async ({ key, tiles }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const body = tiles;
      const response = await fetch("http://localhost:13337/2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: ServerTile[] = await response.json();

      // Return the response data
      return data;
    } catch (error) {
      console.log(`error:${error}`);
      return rejectWithValue((error as Error).message);
    }
  }
);

//not in use
export const removeAndUpdateTile = createAsyncThunk(
  "hexagon/removeAndUpdateTile",
  async (tileToRemove: Tile, { dispatch, getState }) => {
    // Remove the tile
    dispatch(removeTile(tileToRemove));

    // Then update the game data
    dispatch(generateGameData());
  }
);

// making sure that first data will be update then fetch will be sent to server for generated data
export const updateAndGenerateTile = createAsyncThunk(
  "hexagon/updateAndGenerateTile",
  async (tileToUpdate: Tile[], { dispatch, getState }) => {
    // update the tiles
    dispatch(updateTiles(tileToUpdate));

    // Then generate the game data
    dispatch(generateGameData());
  }
);

//Request to start new game with init data
export const startNewGame = createAsyncThunk(
  "hexagon/startNewGame",
  async (_, { dispatch }) => {
    dispatch(hexagonSlice.actions.resetGame());
    dispatch(fetchGameData({ radius: 2 }));
  }
);
