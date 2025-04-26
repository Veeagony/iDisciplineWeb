import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaUserGraduate, FaBalanceScale, FaFileAlt, FaCalendarAlt, FaChartBar, FaBook, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const menuItems = [
    { label: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { label: "Student List", icon: <FaUserGraduate />, path: "/studentlist" },
    { label: "Violations", icon: <FaBalanceScale />, path: "/violations" },
    { label: "Incident Reports", icon: <FaFileAlt />, path: "/incident-reports" },
    { label: "Appointments", icon: <FaCalendarAlt />, path: "/appointments" },
    { label: "Reports", icon: <FaChartBar />, path: "/reports" },
    { label: "Handbook", icon: <FaBook />, path: "/handbook" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={`sidebar ${isOpen ? "" : "collapsed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className="user-section">
        <div className="user-avatar"><FaUserCircle /></div>
        {isOpen && (
          <div className="user-info">
            <p>User</p>
            <small>Position</small>
          </div>
        )}
      </div>

      <div className="menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`menu-item ${currentPath === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
        <div className="menu-item" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
