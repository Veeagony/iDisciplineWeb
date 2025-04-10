import React, { useState } from "react";
import { useParams } from "react-router-dom"; // For accessing the student ID from the URL
import { Link } from "react-router-dom"; // For navigation back to Student Details
import "./StudentViolationRecord.css"

const StudentViolationRecord = () => {
  const { id } = useParams(); // Get the student ID from the URL

  // Fetch the student details and violation records (this is static for now)
  const student = {
    id,
    firstName: "Matthew",
    lastName: "Ke",
    violations: [
      { type: "Minor", count: 3 },
      { type: "Minor", count: 4 },
      { type: "Bullying", count: 5 },
    ],
  };

  // State for selected category filter
  const [selectedCategory, setSelectedCategory] = useState("Minor Offense");

  // Filter violations based on category
  const filteredViolations =
    selectedCategory === "All"
      ? student.violations
      : student.violations.filter((violation) =>
          violation.type.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <div>
      <div className="details-header">
        <h5 className="text-white fw-bold mb-0">Student Violation Record</h5>
        <Link to={`/student-details/${student.id}`} className="btn btn-link">
          Back to Student Details
        </Link>
      </div>

      <div className="student-violation-record mt-4">
        {/* Student Information */}
        <div className="student-card mb-3">
          <div className="d-flex justify-content-between">
            <div className="student-info">
              <h6 className="fw-bold">{student.firstName} {student.lastName}</h6>
              <div className="text-muted">Student No. {student.id}</div>
              <div className="text-muted">Year & Section: {student.year} - {student.section}</div>
              <div className="text-muted">School Year: 2024-2025</div>
            </div>
            <div className="violation-filters">
              <button
                className={`btn ${selectedCategory === "All" ? "btn-primary" : "btn-light"}`}
                onClick={() => setSelectedCategory("All")}
              >
                All
              </button>
              <button
                className={`btn ${selectedCategory === "Major Offense" ? "btn-primary" : "btn-light"}`}
                onClick={() => setSelectedCategory("Major Offense")}
              >
                Major Offense
              </button>
              <button
                className={`btn ${selectedCategory === "Minor Offense" ? "btn-primary" : "btn-light"}`}
                onClick={() => setSelectedCategory("Minor Offense")}
              >
                Minor Offense
              </button>
            </div>
          </div>
        </div>

        {/* Violation records */}
        <div className="violation-categories">
          {filteredViolations.map((violation, index) => (
            <div key={index} className="violation-category d-flex justify-content-between align-items-center mb-3">
              <div className="violation-type">{violation.type}</div>
              <div className="violation-count d-flex align-items-center">
                <span>{violation.count}</span>
                <button className="btn btn-link ms-2">
                  <i className="bi bi-arrow-right-circle"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Behavior Report Section */}
      <div className="behavior-report mt-4">
        <h6 className="text-primary fw-bold">Behavior Report</h6>
        <p>This student is in immediate need of counseling</p>
      </div>
    </div>
  );
};

export default StudentViolationRecord;
