import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home.jsx';               // initial landing page
import App from "./App.jsx";                 // login/signup page
import HomeAfterLogin from "./HomeAfterLogin.jsx"; // post-login page
import BusDetails from './BusDetails.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />                {/* Landing page */}
        <Route path="/app" element={<App />} />             {/* Login/Signup */}
        <Route path="/homeAfterLogin" element={<HomeAfterLogin />} /> {/* Post-login */}
        <Route path="/busdetails" element={<BusDetails/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
