import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaGavel, FaArrowRight, FaBell, FaCommentDots } from "react-icons/fa";
import "./StudentViolationRecord.css";

const StudentViolationRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Static student data for demo purposes
  const student = {
    id,
    image: "https://via.placeholder.com/100",
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

  // Create a mirrored violations list with a modification in the third row:
  // If the third violation (index 2) is "Bullying", change it to "Minor Offense".
  const rightViolations = filteredViolations.map((violation, index) => {
    if (index === 2 && violation.type.toLowerCase() === "bullying") {
      return { ...violation, type: "Minor Offense" };
    }
    return violation;
  });

  return (
    <div className="svr-page">
      {/* Header */}
      <header className="svr-header">
        <h5>Student Violation Record</h5>
        <div className="header-actions">
          {/* Back button navigates back to the Student List */}
          <button className="back-link" onClick={() => navigate("/studentlist")}>
            Back to Student List
          </button>
          <div className="icons-container">
            <FaBell className="header-icon" />
            <FaCommentDots className="header-icon" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="svr-main">
        {/* Left Column: Student Info & Violations */}
        <section className="svr-left">
          {/* Student Card & Filter/Sort Controls */}
          <div className="student-info">
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
                  className={selectedCategory === "Major Offense" ? "active" : ""}
                  onClick={() => setSelectedCategory("Major Offense")}
                >
                  Major Offense
                </button>
                <button
                  className={selectedCategory === "Minor Offense" ? "active" : ""}
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
          </div>

          {/* Violations List (Two Columns) */}
          <div className="violations-columns">
            {/* Left Column: Original Filtered Violations */}
            <div className="violations-column">
              {filteredViolations.map((violation, index) => (
                <div key={index} className="violation-item">
                  <div className="violation-type">
                    <span className="icon">
                      <FaGavel />
                    </span>
                    {violation.type}
                  </div>
                  <div className="violation-count">
                    <span>{violation.count}</span>
                    <button className="detail-btn">
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Mirrored Violations with Modification */}
            <div className="violations-column">
              {rightViolations.map((violation, index) => (
                <div key={index} className="violation-item">
                  <div className="violation-type">
                    <span className="icon">
                      <FaGavel />
                    </span>
                    {violation.type}
                  </div>
                  <div className="violation-count">
                    <span>{violation.count}</span>
                    <button className="detail-btn">
                      <FaArrowRight />
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
