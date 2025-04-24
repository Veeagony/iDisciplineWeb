import React, { useState, useEffect } from "react";
import "./Handbook.css";
import { FaBell, FaCommentDots } from "react-icons/fa";

const Handbook = () => {
    const [searchTerm, setSearchTerm] = useState(""); 
    const [filter, setFilter] = useState("All");
    return (
        <div className="reports-page px-4 py-4">
        {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                    <h4 className="studentsv">Handbook</h4>
                            
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

        </div>
    );
};

export default Handbook;