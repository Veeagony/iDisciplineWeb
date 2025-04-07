import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import LoginScreen from "./DisciplinaryOffice/LoginScreen/Login";
import Dashboard from "./DisciplinaryOffice/Dashboard/Dashboard";
import StudentList from "./DisciplinaryOffice/StudentList/StudentList";
import Violations from "./DisciplinaryOffice/Violations/Violations"

function App() {
  return (
    <Router>
     <Routes>
     <Route path="/" element={<LoginScreen />} />
     <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/studentlist" element={<StudentList />} />
        <Route path="/violations" element={<Violations />} />
        </Route>
    </Routes>
  </Router>
  );
}

export default App;
