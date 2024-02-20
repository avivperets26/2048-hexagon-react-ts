import React from "react";
import { render, screen } from "@testing-library/react";
import Hexagon from "./Hexagon";
import { Provider } from "react-redux";
import { createStore } from "redux"; // Import createStore from Redux

// Define a simple reducer for testing
const initialState = { hexagon: { tiles: [] } }; // Initial state
function reducer(state = initialState) {
  return state;
}

describe("Hexagon", () => {
  const store = createStore(reducer);

  test("renders correctly with default props", () => {
    render(
      <Provider store={store}>
        <Hexagon x={0} y={0} z={0} />
      </Provider>
    );
    const hexagonElement = screen.getByTestId("hexagon-0-0-0");
    expect(hexagonElement).toBeInTheDocument();
  });

  test("renders with custom styles", () => {
    const customStyle: React.CSSProperties = {
      // Specify the type explicitly
      color: "red",
      fontSize: "16px",
    };
    render(
      <Provider store={store}>
        <Hexagon x={1} y={1} z={1} style={customStyle} />
      </Provider>
    );
    const hexagonElement = screen.getByTestId("hexagon-1-1-1");
    expect(hexagonElement).toBeInTheDocument();
  });
});
