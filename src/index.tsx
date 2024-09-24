import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./state/store";

import ErrorBoundary from "./Common/ErrorBoundary";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
);
