import "../css/app.css";

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx";

createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
