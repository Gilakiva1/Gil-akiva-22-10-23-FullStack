import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Favorites } from "./pages/Favorites";

function App() {
  return (
    <div className="App" style={{ minHeight: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:key" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
