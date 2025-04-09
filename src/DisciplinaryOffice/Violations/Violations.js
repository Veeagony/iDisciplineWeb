import React, { useState } from "react";
import AddViolations from "./AddViolations"; 
import "./Violations.css";

const ViolationsPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filter, setFilter] = useState("All");
  const [violations, setViolations] = useState([
    { status: "Unresolved", caseNo: "0001", firstName: "John", lastName: "Doe", violationCategory: "Minor Offense", Date: "Jan 1" },
    { status: "Resolved", caseNo: "0002", firstName: "Jane", lastName: "Smith", violationCategory: "Major Offense", Date: "Feb 2" },
    { status: "Unresolved", caseNo: "0003", firstName: "Alice", lastName: "Johnson", violationCategory: "Minor Offense", Date: "Mar 3" },
    { status: "Resolved", caseNo: "0004", firstName: "Bob", lastName: "Brown", violationCategory: "Major Offense", Date: "Apr 4" },
  ]);

  const getBadgeClass = (status) =>
    status === "Resolved" ? "badge-resolved" : "badge-unresolved";

 
  const filteredViolations = violations.filter((v) =>
    (filter === "All" || v.violationCategory === filter) &&
    (v.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || 
     v.lastName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  
  const handleAddViolation = (newViolation) => {
    setViolations([...violations, newViolation]);
  };

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
              <th>Case No.</th>
              <th>Full Name</th>
              <th>Violation Category</th>
              <th>Date</th>
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
                <td>{v.caseNo}</td>
                <td>{`${v.firstName} ${v.lastName}`}</td> {/* Merged First and Last Name */}
                <td>{v.violationCategory}</td> {/* Violation Category */}
                <td>{v.Date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AddViolations Component (Drawer) */}
      {isDrawerOpen && <AddViolations closeDrawer={() => setDrawerOpen(false)} addViolation={handleAddViolation} />}
    </div>
  );
};

export default ViolationsPage;
