import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './components/Startpage/LandingPage.jsx'
import Register from './components/Startpage/Register.jsx'
import FeedPage from './components/Feed/FeedPage.jsx'
import SearchPage from './components/BookSearch/SearchPage.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LandingPage />}/>
          <Route path="/feed" element={<FeedPage />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/search" element={<SearchPage />}/>
        </Routes>
      </div>
    </Router>
   {/*  <Register></Register> */}
    {/* <FeedPage></FeedPage> */}
   {/*  <SearchPage></SearchPage> */}
  {/*   <LandingPage></LandingPage> */}
  </React.StrictMode>,
)
