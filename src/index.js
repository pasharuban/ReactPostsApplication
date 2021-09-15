import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app"; //вебпак автоматически найдет index.js внутри app

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
