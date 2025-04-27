import React from 'react';
import './Violation.css';
import { FaBell } from 'react-icons/fa';

const Violation = () => {
  // Mock Data
  const violations = [
    { id: 1, studentId: '#00000', dateSent: 'Dec 25 2025' },
    { id: 2, studentId: '#00000', dateSent: 'Dec 25 2025' },
    { id: 3, studentId: '#00000', dateSent: 'Dec 25 2025' },
    { id: 4, studentId: '#00000', dateSent: 'Dec 25 2025' },
  ];

  return (
    <div className="violation-page">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Violation Record</h1>
        <FaBell className="header-bell" />
      </div>

      {/* Sub Header */}
      <div className="violation-subheader">
        <h2 className="violation-title">Bullying</h2>
        <div className="badge">4</div>
      </div>
      <p className="violation-category">Major Offense</p>

      {/* Violation Cards */}
      <div className="violation-cards">
        {violations.map((violation) => (
          <div key={violation.id} className="violation-card">
            <div className="card-top">
              <h3 className="case-title">Case #{violation.id}</h3>
              <div className="status-badge">Status</div>
            </div>
            <div className="card-body">
              <p className="info-line"><strong>Student ID:</strong> {violation.studentId}</p>
              <p className="info-line"><strong>Date Sent:</strong> {violation.dateSent}</p>
              <p className="card-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
              </p>
              <div className="read-more">
                Read More <span className="arrow">&gt;</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Violation;
