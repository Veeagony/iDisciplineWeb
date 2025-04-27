import React from "react";
import "./Menubar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaHome, FaUserCircle, FaBalanceScale, FaFileAlt, FaBook, FaSignOutAlt } from "react-icons/fa";

function Menubar({ isOpen, toggleMenubar }) {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ correct way to get current route

  const menuItems = [
    { label: "Home", icon: <FaHome />, path: "/home" },
    { label: "Student Profile", icon: <FaUserCircle />, path: "/student-profile" },
    { label: "Violations", icon: <FaBalanceScale />, path: "/violations" },
    { label: "Incident Report", icon: <FaFileAlt />, path: "/incident-reports" },
    { label: "Handbook", icon: <FaBook />, path: "/handbook" },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate("/");
  };

  return (
    <div className={`menubar ${isOpen ? "" : "collapsed"}`}>
      <div className="top-section">
        <button className="toggle-btn" onClick={toggleMenubar}>
          <FaBars />
        </button>
      </div>

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
            className={`menu-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </div>
        ))}
        
        {/* Logout Button */}
        <div className="menu-item" onClick={handleLogout}>
          <FaSignOutAlt />
          {isOpen && <span>Logout</span>}
        </div>
      </div>
    </div>
  );
}

export default Menubar;
