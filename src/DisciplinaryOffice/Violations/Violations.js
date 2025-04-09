import React from "react";
import "./Violations.css";

const ViolationsPage = () => {
  const violations = [
    { status: "Unresolved", Date: "Jan 1", firstName: "First Name", lastName: "Last Name", type: "Minor Offense", gradeLevel: "--------------" },
    { status: "Resolved", Date: "Feb 2", firstName: "First Name", lastName: "Last Name", type: "Major Offense", gradeLevel: "--------------" },
    { status: "Unresolved", Date: "Mar 3", firstName: "First Name", lastName: "Last Name", type: "Minor Offense", gradeLevel: "--------------" },
    { status: "Resolved", Date: "Apr 4", firstName: "First Name", lastName: "Last Name", type: "Major Offense", gradeLevel: "--------------" },
  ];

  const getBadgeClass = (status) =>
    status === "Resolved" ? "badge-resolved" : "badge-unresolved";

  return (
    <div className="violations-page px-4 py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold text-dark m-0">Students Violations</h4>
        <span className="notif-count fw-semibold">4</span>
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
          />
        </div>

        <select className="btn btn-light fw-medium rounded-pill px-3">
          <option>Recent</option>
        </select>

        <button className="btn btn-outline-primary fw-semibold">Minor Offense</button>
        <button className="btn btn-outline-primary fw-semibold">Grade Level</button>
        <button className="btn btn-outline-primary fw-semibold">No. of Violations</button>
      </div>

      {/* Add Violation Button */}
      <div className="mb-3">
        <button className="btn btn-primary rounded-pill px-4 py-2 fw-medium">
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
            {violations.map((v, i) => (
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
    </div>
  );
};

export default ViolationsPage;
