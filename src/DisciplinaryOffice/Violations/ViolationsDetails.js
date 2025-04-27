import React, { useState } from "react";
import EditViolation from "./EditViolation";
import ContactParent from "./ContactParent";
import "./ViolationsDetails.css";
import { FaTimes, FaPen } from "react-icons/fa";

const ViolationsDetails = ({ violation, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [contactParentOpen, setContactParentOpen] = useState(false);

  if (!violation) return null;

  return (
    <div className="drawer-overlay">
      <div className="violation-details-drawer">
        <div className="drawer-container">
          {/* Header */}
          <header className="drawer-header">
            <h5 className="drawer-title">Violation Details</h5>
            <div className="header-actions">
              <button className="edit-btnn" onClick={() => setIsEditing(true)}>
                <FaPen />
              </button>
              <button className="close-btnn" onClick={onClose}>
                <FaTimes size={20} />
              </button>
            </div>
          </header>

          {/* Case Number */}
          <div className="case-section">
            <h2 className="case-number">{violation.caseNo || "N/A"}</h2>
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
              <span className="detail-title">Location:</span>
              <span className="detail-content">{violation.Location || "N/A"}</span>
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
            </div>
          </div>

          {/* Footer */}
          <footer className="drawer-footer">
            <button className="footer-btn" onClick={() => setContactParentOpen(true)}>Contact Parent</button>
            {contactParentOpen && (
              <ContactParent
                violationId={violation.id}
                onClose={() => setContactParentOpen(false)}
              />
            )}
            <button className="footer-btn">Print</button>
            <button className="footer-btn">Message</button>
          </footer>
        </div>
      </div>

      {/* Edit Violation Modal */}
      {isEditing && (
        <EditViolation
          violationId={violation.id}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default ViolationsDetails;
