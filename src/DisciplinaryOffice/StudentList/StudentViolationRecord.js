import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./StudentViolationRecord.css";

const StudentViolationRecord = () => {
  const { id } = useParams();

  // Static student data for demo purposes
  const student = {
    id,
    image: "https://via.placeholder.com/100", // Replace with actual image URL if available
    firstName: "Matthew",
    lastName: "Ke",
    year: "8th",
    section: "A",
    violations: [
      { type: "Minor Offense", count: 3 },
      { type: "Minor Offense", count: 4 },
      { type: "Bullying", count: 5 },
    ],
  };

  // State for the filter category (default to "Minor Offense")
  const [selectedCategory, setSelectedCategory] = useState("Minor Offense");

  // Filter violations based on selected category
  const filteredViolations =
    selectedCategory === "All"
      ? student.violations
      : student.violations.filter((violation) =>
          violation.type.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <div className="svr-page">
      {/* Header */}
      <header className="svr-header">
        <h5>Student Violation Record</h5>
        <Link to={`/student-details/${student.id}`} className="back-link">
          Back to Student Details
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="svr-main">
        {/* Left Column */}
        <section className="svr-left">
          {/* Student Card */}
          <div className="student-card">
            <div className="student-photo">
              {student.image ? (
                <img src={student.image} alt="Student Profile" />
              ) : (
                <div className="placeholder-photo" />
              )}
            </div>
            <div className="student-details">
              <h6>
                {student.firstName} {student.lastName}
              </h6>
              <p>Student No. {student.id}</p>
              <p>
                Year &amp; Section: {student.year} - {student.section}
              </p>
              <p>School Year: 2024-2025</p>
            </div>
          </div>

          {/* Filter & Sort Controls */}
          <div className="filter-sort">
            <div className="violation-filters">
              <button
                className={selectedCategory === "All" ? "active" : ""}
                onClick={() => setSelectedCategory("All")}
              >
                All
              </button>
              <button
                className={
                  selectedCategory === "Major Offense" ? "active" : ""
                }
                onClick={() => setSelectedCategory("Major Offense")}
              >
                Major Offense
              </button>
              <button
                className={
                  selectedCategory === "Minor Offense" ? "active" : ""
                }
                onClick={() => setSelectedCategory("Minor Offense")}
              >
                Minor Offense
              </button>
            </div>
            <div className="sort-dropdown">
              <select>
                <option value="highest">Highest</option>
                <option value="lowest">Lowest</option>
              </select>
            </div>
          </div>

          {/* Violations List */}
          <div className="violations-list">
            {filteredViolations.map((violation, index) => (
              <div key={index} className="violation-item">
                <div className="violation-type">{violation.type}</div>
                <div className="violation-count">
                  <span>{violation.count}</span>
                  <button className="detail-btn">
                    <i className="bi bi-arrow-right-circle"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right Column: Behavior Report */}
        <aside className="svr-right">
          <div className="behavior-report">
            <h6>Behavior Report</h6>
            <p>This student is in immediate need of counseling</p>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default StudentViolationRecord;
