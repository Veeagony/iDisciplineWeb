import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Menubar from "../DisciplinaryOffice/Components/Menubar/Menubar";
import "./MainLayout.css";

function MainLayoutStudent() {
  const [isOpen, setIsOpen] = useState(true); // Sidebar should start open
  const toggleMenubar = () => setIsOpen(!isOpen);

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
