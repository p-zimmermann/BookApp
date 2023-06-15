import React from 'react'
import ReactDOM from 'react-dom/client'
import LandingPage from './components/Startpage/LandingPage.jsx'
import Register from './components/Startpage/Register.jsx'
import FeedPage from './components/Feed/FeedPage.jsx'
import SearchPage from './components/Feed/SearchPage.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   {/*  <Register></Register> */}
    {/* <FeedPage></FeedPage> */}
    <SearchPage></SearchPage>
 {/*    <LandingPage></LandingPage> */}
  </React.StrictMode>,
)
