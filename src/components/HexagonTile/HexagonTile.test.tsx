import React from "react";
import { render, screen } from "@testing-library/react";
import HexagonTile from "./HexagonTile";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { AnyAction, Dispatch } from "redux";
import { Tile } from "../../types/types";

describe("HexagonTile", () => {
  // Mock the store creation function
  const mockStore = configureMockStore<
    { hexagon: { tiles: Tile[] } },
    Dispatch<AnyAction>
  >([]);

  // Set up a store for each test case to ensure isolation
  const makeStore = (tiles: Tile[]) =>
    mockStore({
      hexagon: {
        tiles,
      },
    });

  test("renders without crashing", () => {
    const store = makeStore([
      { x: 0, y: 0, z: 0, value: 2 },
      { x: 1, y: 0, z: -1, value: 4 },
    ]);
    render(
      <Provider store={store}>
        <HexagonTile xIndex={0} yIndex={0} zIndex={0} />
      </Provider>
    );
    expect(screen.getByTestId("hexagon-tile")).toBeInTheDocument();
  });

  test("does not show overlay when tile is not active", () => {
    const store = makeStore([
      { x: 0, y: 0, z: 0, value: 2 },
      { x: 1, y: 0, z: -1, value: 4 },
    ]);
    render(
      <Provider store={store}>
        <HexagonTile xIndex={2} yIndex={2} zIndex={-4} />{" "}
      </Provider>
    );
    expect(screen.queryByTestId("hexagon-overlay")).toBeNull();
  });
});
