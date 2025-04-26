import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaGavel, FaArrowRight, FaBell, FaCommentDots, FaArrowLeft } from "react-icons/fa";
import { db } from "../../firebase/firebaseConfig"; 
import { ref, get, onValue } from "firebase/database"; 
import "./StudentViolationRecord.css";
import ViolationsDetails from "../Violations/ViolationsDetails";
const StudentViolationRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [violations, setViolations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [openedViolation, setOpenedViolation] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentRef = ref(db, `students/${id}`);
        const snapshot = await get(studentRef);
        if (snapshot.exists()) {
          setStudent(snapshot.val());
        } else {
          console.error("Student not found in database.");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    const fetchViolations = () => {
      const violationsRef = ref(db, "violations");
      onValue(violationsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const violationsArray = Object.values(data);
          setViolations(violationsArray);
        }
      });
    };

    fetchStudentData();
    fetchViolations();
  }, [id]);

  if (!student) {
    return <div>Loading student information...</div>;
  }

  // Filter violations belonging to this student
  const studentViolations = violations.filter((violation) => 
    violation.offender === `${student.firstName} ${student.middleName ? student.middleName + ' ' : ''}${student.lastName}`
  );

  // Separate into Major and Minor Offenses
  const majorOffenses = studentViolations.filter(v => v.violationCategory === "Major Offense");
  const minorOffenses = studentViolations.filter(v => v.violationCategory === "Minor Offense");

  // Dynamically set violation list
  const violationsList = [
    { type: "Major Offense", count: majorOffenses.length },
    { type: "Minor Offense", count: minorOffenses.length }
  ];

  const filteredViolations =
    selectedCategory === "All"
      ? violationsList
      : violationsList.filter((violation) =>
          violation.type.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  const handleViolationClick = (violation) => {
    setSelectedViolation(violation);
  };

  const handleBack = () => {
    setSelectedViolation(null);
  };

  return (
    <div className="svr-page">
      <header className="svr-header">
        <h5>Student Violation Record</h5>
        <div className="header-actions">
          <button className="back-link" onClick={() => navigate("/studentlist")}>
            Back to Student List
          </button>
          <div className="icons-container">
            <FaBell className="header-icon" />
            <FaCommentDots className="header-icon" />
          </div>
        </div>
      </header>

      <main className="svr-main">
        <section className="svr-left">
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
                <p>Student No. {student.studentId || student.id}</p>
                <p>
                  Year &amp; Section: {student.year} - {student.section}
                </p>
                <p>School Year: 2024-2025</p>
              </div>
            </div>

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
            </div>
          </div>

          {selectedViolation ? (
          <div className="violation-details-panel">
            <header className="vd-header">
              <button className="back-button" onClick={handleBack}>
                <FaArrowLeft />
              </button>
              <h5>
                {selectedViolation.type} ({selectedViolation.count})
              </h5>
            </header>
            <main className="vd-main">
  {studentViolations
    .filter((v) => v.violationCategory === selectedViolation.type)
    .map((violation, index) => (
      <div
        key={index}
        className="case-item"
        onClick={() => setOpenedViolation(violation)} // ← make clickable
        style={{ cursor: "pointer" }}
      >
        <div className="case-header">Case #{index + 1}</div>
        <p><strong>Student ID:</strong> #{student.studentId || "00000"}</p>
        <p><strong>Date Sent:</strong> {violation.Date || violation.DateReported || "N/A"}</p>
        <p><strong>Details:</strong> {violation.notes || "No description available."}</p>
        <div className="case-actions">
          <button className="status-btn">
            {violation.status || "Unresolved"}
          </button>
          <button className="readmore-btn">
            Read More
          </button>
        </div>
      </div>
    ))}
</main>

{openedViolation && (
  <ViolationsDetails
    violation={openedViolation}
    onClose={() => setOpenedViolation(null)}
  />
)}


          </div>
        ) : (
            <div className="violations-columns">
              <div className="violations-column">
                {filteredViolations.map((violation, index) => (
                  <div 
                    key={index} 
                    className="violation-item" 
                    onClick={() => handleViolationClick(violation)}
                  >
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
          )}
        </section>

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
