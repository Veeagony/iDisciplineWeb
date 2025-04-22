import React, { useState } from "react";
import { FaSearch, FaBell, FaCommentDots } from "react-icons/fa";
import IncidentReportsDetails from "./IncidentReportsDetails"; // Import the new component
import './IncidentReports.css';

const IncidentReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedReport, setSelectedReport] = useState(null);

  const [reports, setReports] = useState([
    { status: "Settled", id: "00000", name: "First Name Last Name", message: "Bullied", type: "Type1", date: "2025-04-10", archived: false },
    { status: "Unsettled", id: "00001", name: "First Name Last Name", message: "Vandal", type: "Type2", date: "2025-04-10", archived: false },
    { status: "Settled", id: "00002", name: "First Name Last Name", message: "--------", type: "Type3", date: "2025-04-10", archived: false },
    { status: "Unsettled", id: "00003", name: "First Name Last Name", message: "--------", type: "Type4", date: "2025-04-10", archived: false },
    { status: "Settled", id: "00004", name: "First Name Last Name", message: "Bullied", type: "Type5", date: "2025-04-10", archived: false },
    { status: "Unsettled", id: "00005", name: "First Name Last Name", message: "Vandal", type: "Type6", date: "2025-04-10", archived: false },
    { status: "Settled", id: "00006", name: "First Name Last Name", message: "--------", type: "Type7", date: "2025-04-10", archived: false },
    { status: "Unsettled", id: "00007", name: "First Name Last Name", message: "--------", type: "Type8", date: "2025-04-10", archived: false },
  ]);

  const filteredReports = reports.filter(report => {
    const matchesStatus =
      filter === "All" ? !report.archived :
      filter === "Archive" ? report.archived :
      report.status === filter && !report.archived;

    return matchesStatus && report.message.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleRowClick = (report) => {
    setSelectedReport(report);
  };

  const handleCloseDrawer = () => {
    setSelectedReport(null);
  };

  const handleArchive = () => {
    setReports(prevReports =>
      prevReports.map(r =>
        r.id === selectedReport.id ? { ...r, archived: true } : r
      )
    );
    handleCloseDrawer();
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
          <button className="icon-btn"><FaCommentDots size={20} /></button>
          <button className="icon-btn"><FaBell size={20} /></button>
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

      {/* Drawer for Incident Report Details */}
      {selectedReport && (
        <IncidentReportsDetails
          report={selectedReport}
          closeDrawer={handleCloseDrawer}
          handleArchive={handleArchive}
        />
      )}
    </div>
  );
};

export default IncidentReports;
