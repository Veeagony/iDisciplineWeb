import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../DisciplinaryOffice/Components/Sidebar/Sidebar";
import "./MainLayout.css";

function MainLayout() {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="main-layout">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
