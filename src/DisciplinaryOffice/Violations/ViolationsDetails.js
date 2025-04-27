import React from "react";
import "./ViolationsDetails.css";
import { FaTimes } from "react-icons/fa";

const ViolationsDetails = ({ violation, onClose }) => {
  
  return (
    <div className="drawer open">
      <div className="drawer-container">
        {/* Header: title on left, Edit button and close button on the right */}
        <header className="drawer-header">
          <h2>Violation Details</h2>
          <div className="header-actions">
  <button className="close-btn" onClick={onClose}>
    <FaTimes />
  </button>
</div>

        </header>

        {/* Main Content */}
        <div className="drawer-body">
          {/* Case Section */}
          <div className="case-header">
            <div className="case-info">
              <span className="case-label">Case No.</span>
              <span className="case-number">{violation.caseNo || "N/A"}</span>
            </div>
          </div>

          {/* Violation Details */}
          <div className="violation-details">
            <div className="detail-item">
              <span className="detail-title">Student Name:</span>
              <span className="detail-content">{violation.offender || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Status:</span>
              <span className="detail-content">{violation.status || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Violation Category:</span>
              <span className="detail-content">{violation.violationCategory || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Violation Type:</span>
              <span className="detail-content">{violation.type || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Time Reported:</span>
              <span className="detail-content">{violation.Time || "N/A"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-title">Notes:</span>
              <span className="detail-content">{violation.notes || "No additional notes."}</span>
            </div>
          </div>

          {/* Updates Section */}
          <div className="updates-section">
            <h3>Updates</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-text">
                  Report Sent - {violation.DateReported || "N/A"}
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-text">
                  Scheduled Meeting - Monday, Dec. 27, 2025
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <footer className="drawer-footer">
          <button className="footer-btn">Contact Parent</button>
          <button className="footer-btn">Print</button>
          <button className="footer-btn">Message</button>
        </footer>
      </div>
    </div>
  );
};

export default ViolationsDetails;
