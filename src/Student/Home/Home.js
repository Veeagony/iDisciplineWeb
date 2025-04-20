import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Dashboard Header */}
      <h2>Home</h2>

      {/* Dashboard Stats */}
      <div className="stats-container">
        <div className="stat-card violation">
          <h3>Violation</h3>
          <p>0</p>
        </div>
        <div className="stat-card incident-report">
          <h3>Incident Reports</h3>
          <p>0</p>
        </div>
        <div className="stat-card pending-case">
          <h3>Pending Case</h3>
          <p>0</p>
        </div>
        <div className="stat-card appointment">
          <h3>Appointment</h3>
          <p>0</p>
        </div>
      </div>

      {/* Student Profile */}
      <div className="student-profile">
        <div className="student-card">
          <img src="profile-placeholder.png" alt="Student" className="student-image" />
          <div className="student-info">
            <p>Student Name</p>
            <p>Student No. ____________</p>
            <p>Year & Section: ____________</p>
            <p>School Year: ____________</p>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="appointments-container">
        <h3>Upcoming Appointments</h3>
        <div className="appointments-list">
          <div className="appointment-item">
            <p>Student Counselling</p>
            <p>Date: ________</p>
            <p>Time: ________</p>
          </div>
          <div className="appointment-item">
            <p>Student Counselling</p>
            <p>Date: ________</p>
            <p>Time: ________</p>
          </div>
        </div>
      </div>

      {/* Floating button */}
      <div className="floating-button">
        <button className="settings-btn">⚙</button>
      </div>
    </div>
  );
}

export default Home;
