import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Admin from "./pages/Admin";
import History from "./pages/History";
import Navbar from "./indcomponents/Navbar"; // Adjust the import path as necessary
import "./App.css"; // Import the App.css file
import Blankdiv from "./indcomponents/Blankdiv";
import TeacherLandingPage from "./Teachers/TeacherLandingPage/TecherLandingPage";
import TeacherLogin from "./Teachers/TeacherLogin/TeacherLogin"; // Adjust the import path as necessary

function App() {
  return (
    <Router>
      <div className="app-background">
        <Navbar />
        <div className="main-content">
          <Blankdiv />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/history" element={<History />} />
            <Route path="/teacher/:username" element={<TeacherLandingPage />} />
            <Route path="/teacher" element={<TeacherLogin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
