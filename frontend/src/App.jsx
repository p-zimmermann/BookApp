import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./components/Startpage/LandingPage.jsx";
import Register from "./components/Startpage/Register.jsx";
import FeedPage from "./components/Feed/FeedPage.jsx";
import SearchPage from "./components/BookSearch/SearchPage.jsx";
import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

export default function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    //remove localStorage token
  }
  const handleLogin = () => {
    setLoggedIn(true)
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage handleLogin={handleLogin} />} />
          <Route path="/feed" element={ isLoggedIn ? <FeedPage handleLogout={handleLogout}/> : <Navigate to ="/"/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}
