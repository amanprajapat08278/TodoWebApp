import React from "react"
import './App.css';
import Home from './Pages/Home/Home';
import { Route, Routes, BrowserRouter } from "react-router-dom"
import Resister from './Pages/Resister/Resister';
import Login from "./Pages/Login/Login"
import Profile from "./Pages/Profile/Profile";




function App() {

  let user = JSON.parse(localStorage.getItem("user"))
  let userLogin = user ? true : false

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={userLogin?<Home user={user}/>:<Login/>} />
          <Route path="/resister" element={<Resister/>} />
          <Route path="/profile" element={userLogin?<Profile user={user}/>:<Login/>} />

        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
