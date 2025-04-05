import React, { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  FaBars, FaHome, FaUserGraduate, FaBalanceScale, FaFileAlt,
  FaCalendarAlt, FaChartBar, FaBook, FaSignOutAlt, FaUserGraduate as FaAvatar
} from "react-icons/fa";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => navigate("/");

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "" : "collapsed"}`}>
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <div className="user-section">
          <div className="user-avatar"><FaAvatar /></div>
          <div className="user-info">
            <p>User</p>
            <small>Position</small>
          </div>
        </div>
        <div className="menu">
          <p className="active"><FaHome /><span>Dashboard</span></p>
          <p><FaUserGraduate /><span>Student List</span></p>
          <p><FaBalanceScale /><span>Violations</span></p>
          <p><FaFileAlt /><span>Incident Reports</span></p>
          <p><FaCalendarAlt /><span>Appointments</span></p>
          <p><FaChartBar /><span>Report</span></p>
          <p><FaBook /><span>Handbook</span></p>
          <p onClick={handleLogout}><FaSignOutAlt /><span>Logout</span></p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1">
        <div className="dashboard-header d-flex justify-content-between align-items-center">
          <div>
            <h2>Dashboard</h2>
            <p>for the last 30 days</p>
          </div>
          <div className="notification-icons d-none d-md-block">
            {/* Optional icons like bell/chat here */}
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="row mt-4 g-4">
          <div className="col-md-4">
            <div className="card bg-danger text-white">
              <p><FaBalanceScale /> Violation</p>
              <h3>0</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white">
              <p><FaUserGraduate /> Incident Reports</p>
              <h3>0</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-primary text-white">
              <p><FaCalendarAlt /> Appointment</p>
              <h3>0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
