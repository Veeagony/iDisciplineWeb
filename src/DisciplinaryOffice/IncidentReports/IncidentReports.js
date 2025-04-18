import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import './IncidentReports.css';

const IncidentReports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
    report.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get current page reports
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="incident-reports">
      <div className="header">
        <h2>Incident Reports</h2>
        <div className="filters">
          <input
            type="text"
            placeholder="Search Here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select>
            <option>Recent</option>
            <option>Oldest</option>
          </select>
          <button className="btn-filter">All</button>
          <button className="btn-filter">Logged</button>
          <button className="btn-filter">Review</button>
          <button className="btn-filter">Archive</button>
        </div>
      </div>

      <table className="incident-table">
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
          {currentReports.map((report, index) => (
            <tr key={index}>
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

      <div className="pagination">
        <button 
          onClick={() => handlePagination(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button 
            key={index}
            onClick={() => handlePagination(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button 
          onClick={() => handlePagination(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default IncidentReports;
