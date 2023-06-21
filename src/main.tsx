import React from "react";
import ReactDOM from "react-dom/client";
import ViewDashboard from "./views/ViewDashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ViewDashboard />
  </React.StrictMode>
);
