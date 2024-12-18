import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Cursor from "./components/CustomCursor";
import AstrologerProfile from "./components/AstrologerProfile";
import PastConsultations from "./components/PastConsultations";
import AppointmentHistory from "./components/AppointmentHistory";
import SupportPage from "./components/SupportPage";
import './App.css';

function App() {
  return (
    <Router>
      <Cursor />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AstrologerProfile" element={<AstrologerProfile />} />
        <Route path="/PastConsultations" element={<PastConsultations />}/>
        <Route path="/SupportPage" element={<SupportPage/>}></Route>
        <Route path="/AppointmentHistory" element={<AppointmentHistory/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
