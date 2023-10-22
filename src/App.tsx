import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Favorites } from "./pages/Favorites";

function App() {
  return (
    <div
      className="App"
      style={{ minHeight: "100vh", marginBlock: "10px", marginInline: "5px" }}
    >
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
