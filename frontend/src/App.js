import { Provider } from "react-redux";

import store from "./redux/store";
import { Content } from "./components";
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Content />
      </div>
    </Provider>
  );
}

export default App;
