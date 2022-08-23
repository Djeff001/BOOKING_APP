import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthReducerProvider } from "./context/AuthContext.js";
import { SearchReducerProvider } from "./context/SearchContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthReducerProvider>
      <SearchReducerProvider>
        <App />
      </SearchReducerProvider>
    </AuthReducerProvider>
  </React.StrictMode>
);
