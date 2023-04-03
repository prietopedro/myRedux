import "./App.css";
import { store } from "./redux/store";
import CountersApp from "./components/CountersApp";
import { Provider } from "./lib/react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CountersApp />
      </div>
    </Provider>
  );
}

export default App;
