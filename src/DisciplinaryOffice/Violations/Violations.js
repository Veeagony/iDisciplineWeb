import React, { useState, useEffect } from "react";
import AddViolations from "./AddViolations";
import "./Violations.css";
import { db } from "../../firebase/firebaseConfig"; // Make sure path is correct
import { ref, onValue, push, set } from "firebase/database";

const ViolationsPage = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [violations, setViolations] = useState([]);

  // 🔄 Load violations from Firebase
  useEffect(() => {
    const violationsRef = ref(db, "violations");
    const unsubscribe = onValue(violationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const violationArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setViolations(violationArray);
      } else {
        setViolations([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Add violation to Firebase
  const handleAddViolation = (newViolation) => {
    const newRef = push(ref(db, "violations"));
    const caseNo = `C-${violations.length + 1}`.padStart(6, "0");

    set(newRef, {
      ...newViolation,
      caseNo,
    });

    setDrawerOpen(false);
  };

  const getBadgeClass = (status) =>
    status === "Resolved" ? "badge-resolved" : "badge-unresolved";

  const filteredViolations = violations.filter((v) =>
    (filter === "All" || v.violationCategory === filter) &&
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {["All", "Minor Offense", "Major Offense"].map((type) => (
          <button
            key={type}
            className={`btn ${filter === type ? "btn-primary" : "btn-outline-primary"} fw-semibold`}
            onClick={() => setFilter(type)}
          >
            {type === "All" ? "All Violations" : type}
          </button>
        ))}
      </div>

      {/* Add Violation Button */}
      <div className="mb-3">
        <button
          className="btn btn-primary rounded-pill px-4 py-2 fw-medium"
          onClick={() => setDrawerOpen(true)}
        >
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
              <tr key={v.id}>
                <td>
                  <span className={`badge ${getBadgeClass(v.status)} px-3 py-2`}>
                    {v.status}
                  </span>
                </td>
                <td>{v.caseNo}</td>
                <td>{`${v.firstName} ${v.lastName}`}</td>
                <td>{v.violationCategory}</td>
                <td>{v.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AddViolation Drawer */}
      {isDrawerOpen && (
        <AddViolations
          closeDrawer={() => setDrawerOpen(false)}
          addViolation={handleAddViolation}
        />
      )}
    </div>
  );
};

export default ViolationsPage;
