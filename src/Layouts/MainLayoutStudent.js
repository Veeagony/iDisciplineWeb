import React, { useState } from "react";
import { Outlet } from "react-router-dom"; // Used to render child routes
import Menubar from "../DisciplinaryOffice/Components/Menubar/Menubar"; // Student Menubar
import "./MainLayout.css";

function MainLayoutStudent() {
  const [isOpen, setIsOpen] = useState(false); // Manage menubar open state
  const toggleMenubar = () => setIsOpen(!isOpen); // Toggle menubar visibility

  return (
    <div className="main-layout">
      {/* Menubar */}
      <Menubar isOpen={isOpen} toggleMenubar={toggleMenubar} />
      
      {/* Main content area */}
      <div className={`main-content ${isOpen ? 'sidebar-open' : ''}`}>
  <Outlet />
</div>
    </div>
  );
}

export default MainLayoutStudent;
