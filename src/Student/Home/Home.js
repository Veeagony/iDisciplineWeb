import React from 'react';
import { FaBell, FaGavel, FaUsers, FaHourglassHalf, FaCalendarAlt, FaRobot } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Header */}
      <div className="home-header">
        <h1 className="home-title">Home</h1>
        <FaBell className="home-bell" />
      </div>

      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card violation">
          <FaGavel className="stat-icon" />
          <div className="stat-text">Violation</div>
          <div className="stat-number">0</div>
        </div>
        <div className="stat-card incident">
          <FaUsers className="stat-icon" />
          <div className="stat-text">Incident Reports</div>
          <div className="stat-number">0</div>
        </div>
        <div className="stat-card pending">
          <FaHourglassHalf className="stat-icon" />
          <div className="stat-text">Pending Case</div>
          <div className="stat-number">0</div>
        </div>
        <div className="stat-card appointment">
          <FaCalendarAlt className="stat-icon" />
          <div className="stat-text">Appointment</div>
          <div className="stat-number">0</div>
        </div>
      </div>

      {/* Middle Section: Student Profile + Appointments */}
      <div className="middle-section">
        {/* Student Profile */}
        <div className="student-profile-card">
          <div className="student-header"></div>
          <div className="student-body">
            <div className="student-photo"></div>
            <div className="student-info">
              <h2>Student Name</h2>
              <p>Student No.</p>
              <hr />
              <p>Year & Section:</p>
              <p>School Year:</p>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="appointments-card">
          <h2 className="appointments-title">Upcoming Appointments</h2>
          <div className="appointment-item">
            <div className="appointment-line"></div>
            <div>
              <strong>Student Counselling</strong>
              <p>Date</p>
              <p>Time</p>
            </div>
          </div>
          <div className="appointment-item">
            <div className="appointment-line"></div>
            <div>
              <strong>Student Counselling</strong>
              <p>Date</p>
              <p>Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bot Icon */}
      <div className="floating-bot">
        <FaRobot />
      </div>
    </div>
  );
};

export default Home;
