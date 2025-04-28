import React from 'react';
import { FaTimes } from 'react-icons/fa';
import './IncidentReportDetail.css';

const IncidentReportDetail = ({ isOpen, onClose, reportData }) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={(e) => e.target.classList.contains('drawer-overlay') && onClose()}>
      <div className="drawer-content">
        <div className="drawer-header">
          <h2>Incident Report Details</h2>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        <div className="incident-detail-body">
          <h3>Incident Report No.</h3>

          <p><strong>Date & Time of the incident:</strong><br />{reportData?.dateTime || ''}</p>

          <p><strong>Location:</strong><br />{reportData?.location || ''}</p>

          <p><strong>Violation Category:</strong><br />{reportData?.violationCategory || ''}</p>

          <p><strong>Violation Type:</strong><br />{reportData?.violationType || ''}</p>

          <p><strong>Parties Involved (Victim, Offender, Witness):</strong></p>
          <p><strong>Victim:</strong> {reportData?.victim || ''}</p>
          <p><strong>Offender:</strong> {reportData?.offender || ''}</p>
          <p><strong>Witness:</strong> {reportData?.witness || ''}</p>

          <p><strong>Description of the Incident (Factual Narrative):</strong><br />{reportData?.description || ''}</p>

          <p><strong>Reported by:</strong><br />{reportData?.reportedBy || ''}</p>

          <p><strong>Date Reported:</strong><br />{reportData?.dateReported || ''}</p>
        </div>
      </div>
    </div>
  );
};

export default IncidentReportDetail;
