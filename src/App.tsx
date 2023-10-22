import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/blog/*" element={<BlogApp />} />
        <Route path="/users/*" element={<UserApp />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
