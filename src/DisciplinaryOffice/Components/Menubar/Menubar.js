import React from "react";
import "./Menubar.css";
import { useNavigate } from "react-router-dom";
import { FaBars, FaHome, FaUserCircle, FaBalanceScale, FaFileAlt, FaBook, FaSignOutAlt } from "react-icons/fa";  // Import FaSignOutAlt for logout

function Menubar({ isOpen, toggleMenubar }) {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const menuItems = [
    { label: "Home", icon: <FaHome />, path: "/home" },
    { label: "Student Profile", icon: <FaUserCircle />, path: "/student-profile" },
    { label: "Violations", icon: <FaBalanceScale />, path: "/violations" },
    { label: "Incident Report", icon: <FaFileAlt />, path: "/incident-reports" },
    { label: "Handbook", icon: <FaBook />, path: "/handbook" },
  ];

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user session from localStorage
    navigate("/"); // Redirect to login page
  };

  return (
    <div className={`menubar ${isOpen ? "" : "collapsed"}`}>
      <button className="toggle-btn" onClick={toggleMenubar}>
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
        {/* Add Logout button */}
        <div className="menu-item" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default Menubar;
