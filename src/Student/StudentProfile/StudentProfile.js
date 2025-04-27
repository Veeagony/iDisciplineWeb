import React from 'react';
import './StudentProfile.css';
import { FaBell, FaCommentDots } from 'react-icons/fa'; // ✅ Import both icons

const StudentProfile = () => {
  return (
    <div className="student-profile">

      {/* NEW HEADER */}
      <div className="page-header">
        <h1 className="page-title">Student Profile</h1>
        <div className="header-icons">
          <FaCommentDots className="comment-icon" />
          <FaBell className="notification-bell" />
        </div>
      </div>

      {/* Top section: Profile card + Emergency card side by side */}
      <div className="top-section">
        {/* Profile Card */}
        <div className="top-profile-card">
          <div className="card-header"></div>
          <div className="card-body">
            <div className="photo-section">
              <div className="photo-placeholder">
                <img src="placeholder.png" alt="Student" />
              </div>
            </div>
            <div className="info-section">
              <h2 className="student-name">Student Name</h2>
              <p className="student-no">Student No.</p>
              <p className="student-detail">Year &amp; Section:</p>
              <p className="student-detail">School Year:</p>
            </div>
          </div>
        </div>

        {/* Emergency Contact Card */}
        <div className="emergency-contact-card">
          <h2 className="emergency-title">Emergency Contact</h2>
          <p><strong>Parent/Guardian:</strong></p>
          <p><strong>Email:</strong></p>
          <p><strong>Contact Number:</strong></p>
        </div>
      </div>

      {/* Student Details Section (Below) */}
      <div className="student-details">
        <h2>Student Details</h2>
        <div className="details">
          <div className="left-column">
            <p>First Name:</p>
            <p>Middle Name:</p>
            <p>Last Name:</p>
            <p>Gender:</p>
            <p>Birth Date:</p>
            <p>Address:</p>
          </div>
          <div className="right-column">
            <p>Year &amp; Section:</p>
            <p>Adviser:</p>
            <p>Student Email:</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default StudentProfile;
