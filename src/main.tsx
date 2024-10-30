import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css"; // Global styles

// Render the main App component inside the root element
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
