import React, { useState, useEffect } from "react";
import "./Reports.css";
import { FaBell, FaCommentDots } from "react-icons/fa";

const Reports = () => {
    const [searchTerm, setSearchTerm] = useState(""); 
    const [filter, setFilter] = useState("All");
    return (
        <div className="reports-page px-4 py-4">
        {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                    <h4 className="studentsv">Reports</h4>
                    
                </div>
            
                <div className="d-flex align-items-center gap-3">
                    <button className="icon-btn" >
                        <FaCommentDots size={20} />
                    </button>
                    <button className="icon-btn" >
                        <FaBell size={20} />
                    </button>
                </div>
            </div>

        {/* Filter Bar */}
        <div className="reports-filter-bar d-flex align-items-center gap-3 mb-3">
            <i className="bi bi-search text-dark" />
            <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search Here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />  
            
            <select className="dropdown">
                <option>Year</option>
            </select>

            {["Students", "Violations", "Complaints"].map((type) => (
            <button
                key={type}
                className={`btn ${filter === type ? "filter-active" : "btn-outline-primary"} fw-semibold`}
                onClick={() => setFilter(type)}
            >
                {type === "All" ? "All Violations" : type}
            </button>
            ))}
        </div>
    </div>
    );
};

export default Reports;