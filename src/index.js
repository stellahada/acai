import React from 'react';
import ReactDOM from 'react-dom/client';
import Totem from './Components/toten/toten';
import Login from './pages/Login/index.jsx'

import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/toten" element={<Totem />} />
    </Routes>
  </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
