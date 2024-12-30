import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import MainSection from "./MainSection";
import AstrologyCarousel from "./AstrologyCarousel";
import Footer from "./Footer";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AstrologerProfile from "./AstrologerProfile";
import PastConsultations from "./PastConsultations";
import AppointmentHistory from "./AppointmentHistory";
import SupportPage from "./SupportPage";
import YearlyHoroscope from "./YearlyHoroscope";
import './App.css';

function App() {
  // State to track the login status of the user
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Assuming you have a function to check login status
  useEffect(() => {
    // Example: Check login status (can be from localStorage, cookies, API, etc.)
    const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";
    setIsLoggedIn(userLoggedIn);
  }, []);

  return (
    <Router>
      {/* Render Navbar and Footer only if the user is logged in */}
      {isLoggedIn && <Navbar />}
      
      <Routes>
        {/* Define routes for different pages */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Login />} />
        <Route path="/main" element={isLoggedIn ? <MainSection /> : <Login />} />
        <Route path="/carousel" element={isLoggedIn ? <AstrologyCarousel /> : <Login />} />
        <Route path="/astrologer-profile" element={isLoggedIn ? <AstrologerProfile /> : <Login />} />
        <Route path="/past-consultations" element={isLoggedIn ? <PastConsultations /> : <Login />} />
        <Route path="/appointment-history" element={isLoggedIn ? <AppointmentHistory /> : <Login />} />
        <Route path="/support" element={isLoggedIn ? <SupportPage /> : <Login />} />
        <Route path="/yearly-horoscope" element={isLoggedIn ? <YearlyHoroscope /> : <Login />} />
      </Routes>
      
      {/* Render Footer only if the user is logged in */}
      {isLoggedIn && <Footer />}
    </Router>
  );
}

export default App;
