import React, { useState } from "react";
import AddViolations from "./AddViolations"; // Import AddViolations component
import "./Violations.css";

const ViolationsPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false); // State to control drawer visibility
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term
  const [filter, setFilter] = useState("All");

  const violations = [
    { status: "Unresolved", Date: "Jan 1", firstName: "John", lastName: "Doe", type: "Minor Offense", gradeLevel: "6" },
    { status: "Resolved", Date: "Feb 2", firstName: "Jane", lastName: "Smith", type: "Major Offense", gradeLevel: "7" },
    { status: "Unresolved", Date: "Mar 3", firstName: "Alice", lastName: "Johnson", type: "Minor Offense", gradeLevel: "6" },
    { status: "Resolved", Date: "Apr 4", firstName: "Bob", lastName: "Brown", type: "Major Offense", gradeLevel: "7" },
  ];

  const getBadgeClass = (status) =>
    status === "Resolved" ? "badge-resolved" : "badge-unresolved";

  // Filter violations based on selected filter and search term
  const filteredViolations = violations.filter((v) =>
    (filter === "All" || v.type === filter) &&
    (v.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
     v.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="violations-page px-4 py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-dark m-0">Students Violations</h4>
        <span className="notif-count fw-semibold">{filteredViolations.length}</span>
      </div>

      {/* Filter Bar */}
      <div className="violations-filter-bar d-flex align-items-center gap-3 mb-3">
        <div className="input-group search-box">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search text-dark" />
          </span>
          <input
            type="text"
            className="form-control border-start-0"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </div>

        <button
          className={`btn ${filter === "All" ? "btn-primary" : "btn-outline-primary"} fw-semibold`}
          onClick={() => setFilter("All")}
        >
          All Violations
        </button>

        <button
          className={`btn ${filter === "Minor Offense" ? "btn-primary" : "btn-outline-primary"} fw-semibold`}
          onClick={() => setFilter("Minor Offense")}
        >
          Minor Offense
        </button>
        <button
          className={`btn ${filter === "Major Offense" ? "btn-primary" : "btn-outline-primary"} fw-semibold`}
          onClick={() => setFilter("Major Offense")}
        >
          Major Offense
        </button>
        
      </div>

      {/* Add Violation Button */}
      <div className="mb-3">
        <button className="btn btn-primary rounded-pill px-4 py-2 fw-medium" onClick={() => setDrawerOpen(true)}>
          Add Violation
        </button>
      </div>

      {/* Table */}
      <div className="table-container table-responsive">
        <table className="table align-middle text-center">
          <thead className="table-header">
            <tr>
              <th>Status</th>
              <th>Date</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Type</th>
              <th>Grade Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredViolations.map((v, i) => (
              <tr key={i}>
                <td>
                  <span className={`badge ${getBadgeClass(v.status)} px-3 py-2`}>
                    {v.status}
                  </span>
                </td>
                <td>{v.Date}</td>
                <td>{v.firstName}</td>
                <td>{v.lastName}</td>
                <td>{v.type}</td>
                <td>{v.gradeLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AddViolations Component (Drawer) */}
      {isDrawerOpen && <AddViolations closeDrawer={() => setDrawerOpen(false)} />}
    </div>
  );
};

export default ViolationsPage;
