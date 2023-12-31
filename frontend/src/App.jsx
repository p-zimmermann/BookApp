import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./components/Startpage/LandingPage.jsx";
import Register from "./components/Startpage/Register.jsx";
import FeedPage from "./components/Feed/FeedPage.jsx";
import SearchPage from "./components/BookSearch/SearchPage.jsx";
import ProfilePage from './components/ProfilPage/ProfilePage.jsx'
import ResetPage from "./components/ResetLogin/ResetPage.jsx";
import VerifyReset from "./components/ResetLogin/VerifyReset.jsx";
import SetPassword from "./components/ResetLogin/SetPassword.jsx";

import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles'
import themeOptions from "./customTheme/customTheme.js";

export default function App() {
/*   const [isLoggedIn, setLoggedIn] = useState(false); */

  const [isLoggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token; // convert token value to a boolean
  });

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
      <ThemeProvider theme={themeOptions}>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage handleLogin={handleLogin} />} />
          <Route path="/feed" element={ isLoggedIn ? <FeedPage handleLogout={handleLogout}/> : <Navigate to ="/"/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={ isLoggedIn ? <SearchPage handleLogout={handleLogout}/> : <Navigate to ="/"/>} />
          <Route path="/profile" element={isLoggedIn ? <ProfilePage handleLogout={handleLogout}/> : <Navigate to ="/"/>} /> 
          <Route path="/reset-password" element={<ResetPage />} /> 
          <Route path="/reset-password-mail" element={<VerifyReset />} /> 
          <Route path="/reset-newpassword" element={<SetPassword />} /> 
        </Routes>
      </div>
      </ThemeProvider>
    </Router>
  );
}
