import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import LandingPage from './components/Startpage/LandingPage.jsx'
import Register from './components/Startpage/Register.jsx'
import FeedPage from './components/Feed/FeedPage.jsx'
import SearchPage from './components/BookSearch/SearchPage.jsx'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
 
    <App />
   
 
)
