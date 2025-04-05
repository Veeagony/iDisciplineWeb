import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./DisciplinaryOffice/LoginScreen/Login";
import Dashboard from "./DisciplinaryOffice/Dashboard/Dashboard";


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
  );
}

export default App;
