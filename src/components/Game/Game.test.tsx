import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Game from "./Game";
import * as reduxHooks from "../../hooks";
import { startNewGame } from "../../features/hexagon/hexagonThunks";

jest.mock("../../hooks", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("../../features/hexagon/hexagonThunks", () => ({
  startNewGame: jest.fn().mockReturnValue({ type: "START_NEW_GAME" }),
}));
jest.mock("../Board/Board", () => () => (
  <div data-testid="mock-board">Board</div>
));
beforeEach(() => {
  jest.clearAllMocks();
  (reduxHooks.useDispatch as jest.Mock).mockReturnValue(jest.fn());
  (reduxHooks.useSelector as jest.Mock).mockImplementation(
    (selector: Function) =>
      selector({
        hexagon: {
          tiles: [{ id: 1, x: 0, y: 0, z: 0, value: 2 }],
        },
      })
  );
});

test("starts a new game when 'New Game' button is clicked", async () => {
  render(<Game />);
  const newGameButton = screen.getByText("New Game");
  fireEvent.click(newGameButton);

  await waitFor(() => {
    expect(startNewGame).toHaveBeenCalled();
  });
});
