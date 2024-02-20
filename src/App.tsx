import Game from "./components/Game/Game";
import Header from "./components/Header/Header";
import { Provider } from "react-redux";
import { store } from "./store";
function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="app-container">
          <Header />
          <main>
            <Game />
          </main>
        </div>
      </div>
    </Provider>
  );
}

export default App;
