import React from "react";
import "./ViolationsDetails.css";

const ViolationsDetails = ({ violation, onClose }) => {
  if (!violation) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-main" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>Violation Details</h5>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="drawer-content">
          <div className="case-header">
            <h6 className="case-title">Case No. {violation.caseNo}</h6>
            <button className="edit-btn">Edit</button>
          </div>

          <div className="violation-details">
            <p><strong>Student Name:</strong> {violation.offender}</p>
            <p><strong>Status:</strong> {violation.status}</p>
            <p><strong>Violation Category:</strong> {violation.violationCategory}</p>
            <p><strong>Violation Type:</strong> {violation.violationType}</p>
            <p><strong>Time Reported:</strong> {violation.Date} at {violation.Time}</p>

            <div className="notes-section">
              <p><strong>Notes:</strong></p>
              <p>{violation.Description || "None"}</p>
            </div>
          </div>

          <hr />

          <div className="updates">
            <h6>Updates</h6>
            <ul className="update-list">
              <li>
                <strong>Report Sent</strong>
                <p>Thursday - {violation.DateReported}</p>
              </li>
              <li>
                <strong>Scheduled Meeting</strong>
                <p>Monday - Dec. 25, 2025</p>
              </li>
            </ul>
          </div>

          <div className="actions-footer">
            <button className="btn contact">Contact Parent</button>
            <div className="right-actions">
              <button className="btn print">Print</button>
              <button className="btn message">Message</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViolationsDetails;