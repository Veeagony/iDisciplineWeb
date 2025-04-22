import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import './IncidentReports.css';
import { FaBell, FaCommentDots } from "react-icons/fa";

const IncidentReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null); // Fix: Define selectedReport state

  // Dummy incident reports data
  const reports = [
    { status: "Settled", id: "00000", name: "First Name Last Name", message: "Bullied", type: "Type1", date: "2025-04-10" },
    { status: "Unsettled", id: "00001", name: "First Name Last Name", message: "Vandal", type: "Type2", date: "2025-04-10" },
    { status: "Settled", id: "00002", name: "First Name Last Name", message: "--------", type: "Type3", date: "2025-04-10" },
    { status: "Unsettled", id: "00003", name: "First Name Last Name", message: "--------", type: "Type4", date: "2025-04-10" },
    { status: "Settled", id: "00004", name: "First Name Last Name", message: "Bullied", type: "Type5", date: "2025-04-10" },
    { status: "Unsettled", id: "00005", name: "First Name Last Name", message: "Vandal", type: "Type6", date: "2025-04-10" },
    { status: "Settled", id: "00006", name: "First Name Last Name", message: "--------", type: "Type7", date: "2025-04-10" },
    { status: "Unsettled", id: "00007", name: "First Name Last Name", message: "--------", type: "Type8", date: "2025-04-10" },
  ];

  const filteredReports = reports.filter(report =>
    (report.status === filter || filter === "All") &&
    report.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle when a row is clicked to open the drawer
  const handleRowClick = (report) => {
    setSelectedReport(report); // Set the clicked report
  };

  // Handle closing the drawer
  const handleCloseDrawer = () => {
    setSelectedReport(null); // Close the drawer when clicking the close button
  };

  return (
    <div className="incident-reports px-4 py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <h4 className="incidentr">Incident Reports</h4>
          <span className="report-count">{filteredReports.length}</span>
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
      <div className="filters d-flex align-items-center gap-3 mb-3">
        <input
          type="text"
          className="search-input"
          placeholder="Search Here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select className="dropdown">
          <option>Recent</option>
          <option>Oldest</option>
        </select>

        {/* Filter Buttons */}
        {["All", "Logged", "Review", "Archive"].map((type) => (
          <button
            key={type}
            className={`btn ${filter === type ? "filter-active" : "btn-outline-primary"} fw-semibold`}
            onClick={() => setFilter(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Incident Table */}
      <div className="table-container table-responsive">
        <table className="incident-table mt-4">
          <thead>
            <tr>
              <th>Status</th>
              <th>Student ID</th>
              <th>Full Name</th>
              <th>Message</th>
              <th>Type</th>
              <th>Date Sent</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr key={index} onClick={() => handleRowClick(report)} className="clickable-row">
                <td>{report.status}</td>
                <td>{report.id}</td>
                <td>{report.name}</td>
                <td>{report.message}</td>
                <td>{report.type}</td>
                <td>{report.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Drawer Component for Incident Report Details */}
        {selectedReport && (
          <div className="drawer">
            <div className="drawer-content">
              {/* Close Button */}
              <button className="close-btn" onClick={handleCloseDrawer}>X</button>

              {/* Title */}
              <h3>Incident Report Details</h3>

              {/* Report Details */}
              <div><strong>Incident Report No.</strong>: {selectedReport.id}</div>
              <div><strong>Date & Time of the Incident</strong>: {selectedReport.date}</div>
              <div><strong>Location</strong>: Not Provided</div>
              <div><strong>Parties Involved</strong>: Victim, Offender, Witness</div>
              <div><strong>Description of the Incident</strong>: {selectedReport.message}</div>
              <div><strong>Reported by</strong>: Unknown</div>
              <div><strong>Date Reported</strong>: {selectedReport.date}</div>

              {/* Action Buttons */}
              <button className="btn-archive">Archive</button>
              <button className="btn-log-violation">Log as Violation</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default IncidentReports;
