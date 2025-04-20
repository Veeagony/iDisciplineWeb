import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import MainLayoutStudent from "./Layouts/MainLayoutStudent";
import LoginScreen from "./DisciplinaryOffice/LoginScreen/Login";
import Dashboard from "./DisciplinaryOffice/Dashboard/Dashboard";
import StudentList from "./DisciplinaryOffice/StudentList/StudentList";
import Violations from "./DisciplinaryOffice/Violations/Violations"; // Import the StudentDetailsForm
import StudentViolationRecord from "./DisciplinaryOffice/StudentList/StudentViolationRecord";
import IncidentReports from "./DisciplinaryOffice/IncidentReports/IncidentReports";
import Appointments from "./DisciplinaryOffice/Appointments/Appointments";
import Home from "./Student/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        
        {/* Routes for Admin (MainLayout) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/studentlist" element={<StudentList />} />
          <Route path="/violations" element={<Violations />} />
          <Route path="/student-violation-record/:id" element={<StudentViolationRecord />} />
          <Route path="/incident-reports" element={<IncidentReports />} />
          <Route path="/appointments" element={<Appointments />} />
        </Route>
        
        {/* Routes for Student (MainLayoutStudent) */}
        <Route element={<MainLayoutStudent />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
