import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // Used to render child routes
import Sidebar from "../DisciplinaryOffice/Components/Sidebar/Sidebar"; // Assuming Sidebar is in this folder
import "./MainLayout.css";

function MainLayout() {
  const [isOpen, setIsOpen] = useState(true); // Manage sidebar open state
  const toggleSidebar = () => setIsOpen(!isOpen); // Toggle sidebar visibility

  return (
    <div className="main-layout">
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main content area */}
      <div className="main-content">
        {/* The Outlet component will render child routes here */}
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
