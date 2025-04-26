import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaPen, FaArchive } from "react-icons/fa"; // Import Archive icon along with the Pen icon
import { Link } from "react-router-dom"; // Used for navigation
import "./StudentDetailsForm.css";

const StudentDetailsForm = ({ isOpen, onClose, student, onEdit, onArchive }) => {
  if (!student) return null;

  return (
    <div className={`student-details-drawer ${isOpen ? "open" : ""}`}>
      {/* Header */}
      <div className="details-header">
        <h5 className="text-white fw-bold mb-0">Student Details</h5>
        <IoMdClose
          size={24}
          className="text-white"
          onClick={onClose}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Body */}
      <div className="details-body">
        {/* Profile Card */}
        <div className="profile-card shadow-sm mb-4">
          <div className="profile-header">
          <div className="header-content">
        </div>  
      </div>

      <div className="profile-body p-3">
        <div className="d-flex align-items-center">
          {student.image ? (
            <img
              src={student.image}
              alt="Student Profile"
              className="profile-photo me-3"
            />
          ) : (
            <div className="image-placeholder-lg me-3"></div>
          )}
      <div>
          <h6 className="fw-bold mb-1">
            {student.firstName} {student.lastName}
          </h6>
          <div className="text-muted small">
            Student No. {student.studentId || "-"}
          </div>
          <div className="text-muted small">
            Year & Section: {student.year} - {student.section}
          </div>
          <div className="text-muted small">School Year: 2024-2025</div>
      </div>
          <button className="edit-btn" onClick={() => onEdit?.(student)}>
                <FaPen />
              </button>
              {/* Archive Icon (added below the edit icon) */}
              <button className="archive-btnn" onClick={() => onArchive?.(student)}>
                <FaArchive />
              </button>
    </div>
  </div>
</div>
          

        {/* Student Info + Emergency Contact */}
        <div className="row gx-5 mb-4">
          <div className="col-6">
            <p>
              <strong>First Name:</strong>
              <br />
              {student.firstName}
            </p>
            <p>
              <strong>Middle Name:</strong>
              <br />
              {student.middleName || "-"}
            </p>
            <p>
              <strong>Last Name:</strong>
              <br />
              {student.lastName}
            </p>
            <p>
              <strong>Gender:</strong>
              <br />
              {student.gender}
            </p>
            <p>
              <strong>Address:</strong>
              <br />
              {student.address || "-"}
            </p>
            <p>
              <strong>Year &amp; Section:</strong>
              <br />
              {student.year} - {student.section}
            </p>
            <p>
              <strong>Adviser:</strong>
              <br />
              {student.adviser || "-"}
            </p>
          </div>
          <div className="col-6">
            <p className="text-primary fw-semibold mb-1">Emergency Contact</p>
            <p>
              <strong>Parent/Guardian:</strong>
              <br />
              {student.parent || "-"}
            </p>
            <p>
              <strong>Email:</strong>
              <br />
              {student.email}
            </p>
            <p>
              <strong>Contact Number:</strong>
              <br />
              {student.phone}
            </p>
          </div>
        </div>

        {/* Reports Section */}
        <div className="d-flex gap-3">
          <div className="card flex-grow-1 p-3 shadow-sm">
            <h6 className="fw-bold">Student Report</h6>
            {/* Clickable Violation Record */}
            <Link
              to={`/student-violation-record/${student.id}`}
              className="btn btn-link p-0"
            >
              Violation Record &gt;
            </Link>
          </div>
          <div className="card flex-grow-1 p-3 shadow-sm">
            <h6 className="text-primary fw-bold">Behavior Report</h6>
            <p className="small mb-0">
              This student is in immediate need of counseling
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsForm;
