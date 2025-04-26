import React from "react";
import "./AppointmentsDetails.css";

const AppointmentsDetails = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="drawer-overlay">
      <div className="appointment-details-drawer">
        <div className="appointment-details-container">
          {/* Header Section */}
          <div className="header-section">
            <h3>Appointment Details</h3>
            <div className="header-buttons">
              <button className="edit-btn-header">Edit</button>
              <button onClick={onClose} className="close-btn">
                &times;
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="details-section">
            <div className="case-number">
              <h5>Case No. {appointment.caseNo || 'N/A'}</h5>
            </div>

            <div className="detail-item">
              <strong>Student Name:</strong> {appointment.studentName || 'N/A'}
            </div>

            {/* Row 1 */}
            <div className="detail-grid">
              <div className="detail-column">
                <div className="detail-item">
                  <strong>Status:</strong> {appointment.status || 'N/A'}
                </div>
              </div>
              <div className="detail-column">
                <div className="detail-item">
                  <strong>Violation Type:</strong> {appointment.violationType || 'N/A'}
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="detail-grid">
              <div className="detail-column">
                <div className="detail-item">
                  <strong>Violation Category:</strong> {appointment.violationCategory || 'N/A'}
                </div>
              </div>
              <div className="detail-column">
                <div className="detail-item">
                  <strong>Time Reported:</strong> {appointment.timeReported || 'N/A'}
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="detail-grid">
              <div className="detail-column">
                <div className="detail-item">
                  <strong>Scheduled Meeting:</strong>{" "}
                  {appointment.datetime
                    ? new Date(appointment.datetime).toLocaleString()
                    : 'N/A'}
                </div>
              </div>
              <div className="detail-column">
                <div className="detail-item">
                  <strong>Meeting Type:</strong> {appointment.meetingType || 'N/A'}
                </div>
              </div>
            </div>

            {/* Notes Section */}
            <div className="notes-section">
              <strong>Brief Description:</strong>
              <p className="notes-content">
                {appointment.briefDesc || 'No description available.'}
              </p>
            </div>

            {/* Updates Section */}
            <div className="updates-section">
              <h6>Updates</h6>
              <ul className="update-list">
                <li className="update-item">
                  <strong>Report Sent</strong>
                  <span>{appointment.updatedReportSent || 'Thursday - Dec. 25, 2025'}</span>
                </li>
                <li className="update-item">
                  <strong>Scheduled Meeting</strong>
                  <span>{appointment.updatedMeeting || 'Monday - Dec. 25, 2025'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="print-btn">Print</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsDetails;
