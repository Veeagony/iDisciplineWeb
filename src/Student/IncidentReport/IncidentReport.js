import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import AddIncidentReport from './AddIncidentReport'; // Import the drawer
import IncidentReportDetail from './IncidentReportDetail'; // Import the details drawer
import './IncidentReport.css';

const IncidentReport = () => {
  const [incidentReports, setIncidentReports] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isDetailOpen, setIsDetailOpen] = useState(false); // Detail drawer state
  const [selectedReport, setSelectedReport] = useState(null); // Selected report data

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const openDetailDrawer = (report) => {
    setSelectedReport(report);
    setIsDetailOpen(true);
  };

  const closeDetailDrawer = () => {
    setIsDetailOpen(false);
    setSelectedReport(null);
  };

  const addIncidentReport = (newReport) => {
    setIncidentReports([...incidentReports, newReport]);
  };

  return (
    <div className="incident-report-container">
      {/* Header */}
      <div className="header">
        <div className="header-left">
          <h1>Incident Reports</h1>
          <div className="counter">{incidentReports.length}</div>
        </div>
        <FaBell className="bell-icon" />
      </div>

      {/* Button */}
      <button className="make-incident-button" onClick={openDrawer}>
        Make an Incident Report
      </button>

      {/* Incident Cards */}
      <div className="incident-cards">
        {incidentReports.map((report, index) => (
          <div
            key={index}
            className="incident-card"
            onClick={() => openDetailDrawer(report)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-header">
              <span className="incident-title">Incident Report #{index + 1}</span>
              <span className="status-pill">Reviewed</span>
            </div>
            <div className="card-body">
              <p className="field-label"><strong>Violation Category:</strong> {report.violationCategory}</p>
              <p className="field-label"><strong>Violation Type:</strong> {report.violationType}</p>
              <p className="field-label"><strong>Date Sent:</strong> {report.dateSent}</p>
              <p className="description">{report.description}</p>
              <a href="#" className="read-more">Read More {'>'}</a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Incident Drawer */}
      <AddIncidentReport isOpen={isDrawerOpen} onClose={closeDrawer} onSubmit={addIncidentReport} />

      {/* Incident Detail Drawer */}
      <IncidentReportDetail
        isOpen={isDetailOpen}
        onClose={closeDetailDrawer}
        reportData={{
          dateTime: selectedReport?.dateSent,
          location: selectedReport?.location,
          violationCategory: selectedReport?.violationCategory,
          violationType: selectedReport?.violationType,
          victim: selectedReport?.victim,
          offender: selectedReport?.offender,
          witness: selectedReport?.witness,
          description: selectedReport?.description,
          reportedBy: selectedReport?.reportedBy,
          dateReported: selectedReport?.dateReported,
        }}
      />
    </div>
  );
};

export default IncidentReport;
