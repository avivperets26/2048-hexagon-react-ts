// import { render, screen } from "@testing-library/react";
// import Board from "./Board";
// import * as hooks from "../../hooks";
// import { fetchGameData } from "../../features/hexagon/hexagonThunks";
// import { RootState } from "../../store";
// import { HexagonState } from "../../features/hexagon/hexagonSlice";

// type SelectorFunction<T> = (state: RootState) => T;
// // Mock the entire module where your custom hooks are defined
// jest.mock("../../hooks", () => ({
//   useDispatch: jest.fn(),
//   useSelector: jest.fn(),
// }));

// // Mock fetchGameData action creator
// jest.mock("../../features/hexagon/hexagonThunks", () => ({
//   fetchGameData: jest
//     .fn()
//     .mockReturnValue({ type: "FETCH_GAME_DATA_SUCCESS", payload: [] }),
// }));

// beforeEach(() => {
//   jest.clearAllMocks();

//   // Mocking useDispatch
//   (hooks.useDispatch as jest.Mock).mockReturnValue(jest.fn());

//   // Adjusting useSelector mock
//   // Adjusting useSelector mock
//   (hooks.useSelector as jest.Mock).mockImplementation(
//     (selector: SelectorFunction<HexagonState>) => {
//       // Mocking both baseTile, tiles, and adding missing properties to ensure consistency across components
//       const mockState = {
//         hexagon: {
//           baseTile: [
//             { x: 0, y: 0, z: 0 }, // Center tile
//             { x: 0, y: 1, z: -1 }, // Top
//             { x: 0, y: -1, z: 1 }, // Bottom
//             { x: -1, y: 1, z: 0 }, // Top left
//             { x: 1, y: 0, z: -1 }, // Top right
//             { x: -1, y: 0, z: 1 }, // Bottom left
//             { x: 1, y: -1, z: 0 }, // Bottom right
//           ],
//           tiles: [
//             { x: 0, y: 0, z: 0, value: 2 },
//             { x: 0, y: 1, z: -1, value: 2 }, // Top
//             { x: 0, y: -1, z: 1, value: 2 }, // Bottom
//           ],
//           overlayPositions: [], // Assuming this is the correct type and structure for this example
//           loading: false, // Assuming not loading for this mock
//           error: null, // Assuming no error for this mock
//         },
//       };
//       return selector(mockState);
//     }
//   );
// });

// afterEach(() => {
//   jest.clearAllMocks();
// });

// // Test cases
// describe("Board Component", () => {
//   it("renders without crashing", () => {
//     render(<Board />);
//     expect(screen.getByTestId("hexagon-grid")).toBeInTheDocument();
//   });

//   it("fetches initial game data on mount", () => {
//     render(<Board />);
//     expect(fetchGameData).toHaveBeenCalledWith({ radius: 2 });
//   });

//   it("correctly renders HexagonTile components based on fetched tiles", () => {
//     render(<Board />);
//     const hexagonTiles = screen.getAllByTestId("hexagon-tile");
//     expect(hexagonTiles.length).toBe(7);
//   });
// });
describe.skip("Board.test not finised", () => {
  it("Board.test not finised", () => {});
});
