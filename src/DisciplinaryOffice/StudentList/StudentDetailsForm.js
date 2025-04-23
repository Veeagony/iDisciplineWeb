import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaPen } from "react-icons/fa"; // Add FaPen for the pencil icon
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./StudentDetailsForm.css";

const StudentDetailsForm = ({ isOpen, onClose, student, onEdit, onArchive }) => {
  if (!student) return null;

  const handleArchive = () => {
    onArchive(student.id); // Call the archiving function when button is clicked
  };

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
          <div className="d-flex align-items-center p-3">
            <div className="image-placeholder-lg me-3"></div>
            <div>
              <h6 className="fw-bold mb-1">{student.firstName} {student.lastName}</h6>
              <div className="text-muted small">Student No.</div>
              <div className="text-muted small">Year & Section: {student.year} - {student.section}</div>
              <div className="text-muted small">School Year: 2024-2025</div>
            </div>
          </div>
          {/* Edit Icon */}
          <button className="edit-btn" onClick={() => onEdit?.(student)}>
            <FaPen />
          </button>
        </div>

        {/* Student Info + Emergency Contact */}
        <div className="row gx-5 mb-4">
          <div className="col-6">
            <p><strong>First Name:</strong><br />{student.firstName}</p>
            <p><strong>Middle Name:</strong><br />{student.middleName || "-"}</p>
            <p><strong>Last Name:</strong><br />{student.lastName}</p>
            <p><strong>Gender:</strong><br />{student.gender}</p>
            <p><strong>Address:</strong><br />{student.address || "-"}</p>
            <p><strong>Year & Section:</strong><br />{student.year} - {student.section}</p>
            <p><strong>Adviser:</strong><br />{student.adviser || "-"}</p>
          </div>
          <div className="col-6">
            <p className="text-primary fw-semibold mb-1">Emergency Contact</p>
            <p><strong>Parent/Guardian:</strong><br />{student.parent || "-"}</p>
            <p><strong>Email:</strong><br />{student.email}</p>
            <p><strong>Contact Number:</strong><br />{student.phone}</p>
          </div>
        </div>

        {/* Reports Section */}
        <div className="d-flex gap-3">
          <div className="card flex-grow-1 p-3 shadow-sm">
            <h6 className="fw-bold">Student Report</h6>
            {/* Clickable Violation Record */}
            <Link to={`/student-violation-record/${student.id}`} className="btn btn-link p-0">
              Violation Record &gt;
            </Link>
          </div>
          <div className="card flex-grow-1 p-3 shadow-sm">
            <h6 className="text-primary fw-bold">Behavior Report</h6>
            <p className="small mb-0">This student is in immediate need of counseling</p>
          </div>
        </div>

        {/* Archive Button */}
        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-warning" onClick={handleArchive}>Archive</button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsForm;
