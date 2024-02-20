import { configureStore } from "@reduxjs/toolkit";
import hexagonReducer from "./features/hexagon/hexagonSlice";

export const store = configureStore({
  reducer: {
    hexagon: hexagonReducer,
  },
});

// Define RootState based on the store's state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
