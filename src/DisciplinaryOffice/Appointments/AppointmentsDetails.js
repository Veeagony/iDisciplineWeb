import React from 'react';
import './AppointmentsDetails.css';

const AppointmentsDetails = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="drawer-overlay">
      <div className="appointment-details-drawer">
        <div className="appointment-details-container">
          {/* Header Section with Title, Edit and Close buttons */}
          <div className="header-section">
            <h3>Appointment Details</h3>
            <div className="header-buttons">
              <button className="edit-btn-header">Edit</button>
              <button onClick={onClose} className="close-btn">&times;</button>
            </div>
          </div>

          {/* Main Content */}
          <div className="details-section">
            <div className="case-number">
              <h5>Case No. {appointment.caseNumber || ''}</h5>
            </div>

            <div className="detail-item">
              <strong>Student Name:</strong> {appointment.studentName}
            </div>

            {/* Row 1: Status and Violation */}
            <div className="detail-grid">
              <div className="detail-column">
                <div className="detail-item">
                  <strong>Status:</strong> {appointment.status || 'N/A'}
                </div>
              </div>
              <div className="detail-column">
                <div className="detail-item">
                  <strong>Violation:</strong> {appointment.violation || 'N/A'}
                </div>
              </div>
            </div>

            {/* Row 2: Category and Time Reported */}
            <div className="detail-grid">
              <div className="detail-column">
                <div className="detail-item">
                  <strong>Category:</strong> {appointment.category || 'N/A'}
                </div>
              </div>
              <div className="detail-column">
                <div className="detail-item">
                  <strong>Time Reported:</strong> {appointment.datetime ? new Date(appointment.datetime).toLocaleString() : 'N/A'}
                </div>
              </div>
            </div>

            {/* Row 3: Scheduled Meeting and Meeting Type */}
            <div className="detail-grid">
              <div className="detail-column">
                <div className="detail-item">
                  <strong>Scheduled Meeting:</strong> {appointment.scheduledMeeting || 'N/A'}
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
              <strong>Notes:</strong>
              <p className="notes-content">
                {appointment.notes || 'No notes available'}
              </p>
            </div>

            {/* Updates Section */}
            <div className="updates-section">
              <h6>Updates</h6>
              <ul className="update-list">
                {appointment.updates?.map((update, index) => (
                  <li key={index} className="update-item">
                    <strong>{update.title}</strong>
                    <span>{update.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons (Only Print button remains at the bottom) */}
            <div className="action-buttons">
              <button className="print-btn">Print</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsDetails;
