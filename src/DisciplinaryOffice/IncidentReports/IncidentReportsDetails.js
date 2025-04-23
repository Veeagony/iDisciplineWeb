import React from "react";
import "./IncidentReportsDetails.css"; // Updated styles for the drawer

const IncidentReportsDetails = ({ report, closeDrawer, handleArchive }) => {
  return (
    <div className="drawer">
      <div className="drawer-header">
        <span className="drawer-title">Incident Report Details</span>
        <button className="close-btn" onClick={closeDrawer}>X</button>
      </div>

      <div className="drawer-body">
        <div><strong>Incident Report No.</strong>: {report.id}</div>
        <div><strong>Date & Time of the Incident</strong>: {report.date}</div>
        <div><strong>Location</strong>: Not Provided</div>
        <div><strong>Parties Involved</strong>: Victim, Offender, Witness</div>
        <div><strong>Description of the Incident</strong>: {report.message}</div>
        <div><strong>Reported by</strong>: Unknown</div>
        <div><strong>Date Reported</strong>: {report.date}</div>

        <div className="button-container">
          <button className="btn-archive" onClick={handleArchive}>Archive</button>
          <button className="btn-log-violation">Log as Violation</button>
        </div>
      </div>
    </div>
  );
};

export default IncidentReportsDetails;
