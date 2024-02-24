// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import Game from "./Game";
// import * as reduxHooks from "../../hooks";
// import { startNewGame } from "../../features/hexagon/hexagonThunks";
// import { RootState } from "../../store";
// import { HexagonState } from "../../features/hexagon/hexagonSlice";

// jest.mock("../../hooks", () => ({
//   useSelector: jest.fn(),
//   useDispatch: jest.fn(),
// }));

// jest.mock("../../features/hexagon/hexagonThunks", () => ({
//   startNewGame: jest.fn().mockReturnValue({ type: "START_NEW_GAME" }),
// }));
// jest.mock("../Board/Board", () => () => (
//   <div data-testid="mock-board">Board</div>
// ));
// //type Selector<T> = (state: RootState) => T;

// beforeEach(() => {
//   jest.clearAllMocks();
//   (reduxHooks.useDispatch as jest.Mock).mockReturnValue(jest.fn());
//   (reduxHooks.useSelector as jest.Mock).mockImplementation(
//     (
//       selector: (state: RootState) => HexagonState // Use the Selector type here
//     ) =>
//       selector({
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
//         },
//       })
//   );
// });

// test("starts a new game when 'New Game' button is clicked", async () => {
//   render(<Game />);
//   const newGameButton = screen.getByText("New Game");
//   fireEvent.click(newGameButton);

//   await waitFor(() => {
//     expect(startNewGame).toHaveBeenCalled();
//   });
// });
describe.skip("Game.test not finised", () => {
  it("Game.test not finised", () => {});
});
