import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SearchReducerProvider } from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SearchReducerProvider>
      <App />
    </SearchReducerProvider>
  </React.StrictMode>
);
