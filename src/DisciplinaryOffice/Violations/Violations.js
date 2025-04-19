import React, { useState, useEffect } from "react";
import AddViolations from "./AddViolations";
import "./Violations.css";
import { FaBell, FaCommentDots } from "react-icons/fa";
import { db } from "../../firebase/firebaseConfig"; // Make sure path is correct
import { ref, onValue, push, set } from "firebase/database";

const Violations = () => {
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
        setViolations([]); // In case no data is found
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

    setDrawerOpen(false); // Close drawer after adding
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
        <div className="d-flex align-items-center">
          <h4 className="studentsv">Students Violations</h4>
          <span className="violations-count">{filteredViolations.length}</span>
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
      <div className="violations-filter-bar d-flex align-items-center gap-3 mb-3">
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

        {["All", "Minor Offense", "Major Offense", "Grade Level", "No. of Violations"].map((type) => (
          <button
            key={type}
            className={`btn ${filter === type ? "filter-active" : "btn-outline-primary"} fw-semibold`}
            onClick={() => setFilter(type)}
          >
            {type === "All" ? "All Violations" : type}
          </button>
        ))}

      </div>

      {/* Add Violation Button */}
      <div className="d-flex justify-content-end">
        <button className="addviolationbtn" onClick={() => setDrawerOpen(true)}>
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

      {/* AddViolations Component (Drawer) */}
      {isDrawerOpen && (
        <AddViolations
          closeDrawer={() => setDrawerOpen(false)}
          addViolation={handleAddViolation}
        />
      )}
    </div>
  );
};

export default Violations;
