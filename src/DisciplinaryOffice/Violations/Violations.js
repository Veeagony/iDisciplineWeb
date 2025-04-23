import React, { useState, useEffect } from "react";
import AddViolations from "./AddViolations";
import ViolationsDetails from "./ViolationsDetails";
import "./Violations.css";
import { FaBell, FaCommentDots } from "react-icons/fa";
import { db } from "../../firebase/firebaseConfig";
import { ref, onValue, push, set } from "firebase/database";

const Violations = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [violations, setViolations] = useState([]);
  const [selectedViolation, setSelectedViolation] = useState(null);

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
        console.log("✅ Violations data updated in state:", violationArray);
      } else {
        setViolations([]);
        console.log("⚠️ No violations data found in Firebase.");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddViolation = (newViolation) => {
    console.log("➡️ handleAddViolation received:", newViolation); // Check the received data
    const newRef = push(ref(db, "violations"));
    const caseNo = `C-${violations.length + 1}`.padStart(6, "0");
    const newViolationWithCaseNo = { ...newViolation, caseNo };
    set(newRef, newViolationWithCaseNo)
      .then(() => {
        console.log("✅ New violation added to Firebase:", newViolationWithCaseNo);
        setDrawerOpen(false);
      })
      .catch((error) => {
        console.error("❌ Error adding violation to Firebase:", error);
      });
  };

  const getBadgeClass = (status) =>
    status === "Resolved" ? "badge-resolved" : "badge-unresolved";

  const filteredViolations = violations.filter((v) => {
    const matchesFilter = filter === "All" || v.violationCategory === filter;
    const matchesSearch = !searchTerm || (v.offender && v.offender.toLowerCase().includes(searchTerm.toLowerCase()));
    const shouldInclude = matchesFilter && matchesSearch;
    // Log each violation and whether it passes the filter
    console.log(`🔎 Filtering: ${v?.offender || 'No Offender'}, Category: ${v?.violationCategory}, Filter: ${filter}, Search: ${searchTerm}, Include: ${shouldInclude}`);
    return shouldInclude;
  });

  console.log("🔄 Current violations state:", violations);
  console.log("➡️ Filtered violations to render:", filteredViolations);

  return (
    <div className="violations-page px-4 py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <h4 className="studentsv">Students Violations</h4>
          <span className="violations-count">{filteredViolations.length}</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="icon-btn">
            <FaCommentDots size={20} />
          </button>
          <button className="icon-btn">
            <FaBell size={20} />
          </button>
        </div>
      </div>

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

      <div className="d-flex justify-content-end">
        <button className="addviolationbtn" onClick={() => setDrawerOpen(true)}>
          Add Violation
        </button>
      </div>

      <div className="table-container table-responsive">
        <table className="table align-middle text-center">
          <thead className="table-header">
            <tr>
              <th>Status</th>
              <th>Case No.</th>
              <th>Student Name</th>
              <th>Violation Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
  {filteredViolations.map((v) => (
    <tr key={v.id} onClick={() => setSelectedViolation(v)} style={{ cursor: 'pointer'}}>
      <td>
        <span className={`badge ${getBadgeClass(v.status)} px-3 py-2`}>
          {v.status}
        </span>
      </td>
      <td>{v.caseNo}</td>
      <td>{v.offender}</td> {/* Display the offender's name here */}
      <td>{v.violationCategory}</td>
      <td>{v.Date}</td>
    </tr>
  ))}

  
</tbody>
        </table>
      </div>

      {isDrawerOpen && (
        <AddViolations
          closeDrawer={() => setDrawerOpen(false)}
          addViolation={handleAddViolation}
        />
      )}

      {selectedViolation && (
        <ViolationsDetails
          violation={selectedViolation}
          onClose={() => setSelectedViolation(null)}
        />
      )}
    </div>
  );
};

export default Violations;