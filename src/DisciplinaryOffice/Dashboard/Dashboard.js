import React, { useState } from "react";
import "./Dashboard.css";
import { FaBalanceScale, FaUserGraduate, FaCalendarAlt } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="d-flex">
      {/* Main Content */}
      <div className="main-content flex-grow-1 p-4">
        <div className="dashboard-header d-flex justify-content-between align-items-center">
          <div>
            <label>Dashboard</label>
            <p>for the last 30 days</p>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="row mt-4 g-4">
          <div className="col-md-4">
            <div className="card bg-danger text-white">
              <div className="card-icon">
                <FaBalanceScale />
              </div>
              <h4>Violation</h4>
              <h3>0</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white">
              <div className="card-icon">
                <FaUserGraduate />
              </div>
              <h4>Incident Reports</h4>
              <h3>0</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-primary text-white">
              <div className="card-icon">
                <FaCalendarAlt />
              </div>
              <h4>Appointment</h4>
              <h3>0</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
