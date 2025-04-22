import React from "react";
import "./ViolationsDetails.css";

const ViolationsDetails = ({ violation, onClose }) => {
  if (!violation) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <h5>Violation Details</h5>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="drawer-content">
          <h6 className="case-title">{violation.caseNo}</h6>
          <p><strong>Student Name:</strong> {violation.firstName} {violation.lastName}</p>
          <p><strong>Status:</strong> {violation.status}</p>
          <p><strong>Category:</strong> {violation.violationCategory}</p>
          <p><strong>Violation:</strong> {violation.violation}</p>
          <p><strong>Time Reported:</strong> {violation.date}</p>
          <p><strong>Notes:</strong> {violation.notes || "None"}</p>

          <hr />
          <div className="updates">
            <h6>Updates</h6>
            <div className="timeline">
              <div className="timeline-item">
                <span className="dot blue"></span>
                <p><strong>Report Sent</strong><br />Thursday - Dec. 25, 2025</p>
              </div>
              <div className="timeline-item">
                <span className="dot blue"></span>
                <p><strong>Scheduled Meeting</strong><br />Monday - Dec. 25, 2025</p>
              </div>
            </div>
          </div>

          <div className="drawer-footer">
            <button className="btn contact">Contact Parent</button>
            <button className="btn print">Print</button>
            <button className="btn message">Message</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViolationsDetails;
