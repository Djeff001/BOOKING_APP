import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthReducerProvider } from "./context/AuthContext.js";
import { DarkModeContextProvider } from "./context/darkModeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthReducerProvider>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </AuthReducerProvider>
  </React.StrictMode>
);
