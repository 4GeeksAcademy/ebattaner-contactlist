import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router";
import Agendasola from "./pages/Agendasola";
import Nuevocontacto from "./pages/Nuevocontacto";
import Editarcontacto from "./pages/Editarcontacto";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/agendas/:slug" element={<Agendasola />} />
        <Route
          path="/agendas/:slug/Nuevocontacto"
          element={<Nuevocontacto />}
        />
        <Route
          path="/agendas/:slug/Editarcontacto/:id"
          element={<Editarcontacto />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
