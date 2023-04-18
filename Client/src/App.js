import React from "react"
import './App.css';
import Home from './Pages/Home/Home';
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Resister from './Pages/Resister/Resister';
import Login from "./Pages/Login/Login"

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/resister" element={<Resister/>} />

        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
