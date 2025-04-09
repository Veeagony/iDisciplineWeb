import React, { useState } from "react";
import "./AddViolations.css";

const AddViolations = ({ closeDrawer }) => {
  return (
    <div className="add-violation-page">
      {/* Drawer (Sliding Panel) */}
      <div className="drawer open">
        <div className="drawer-header">
          <h4 className="text-white">Add Violation</h4>
          <button className="close-btn" onClick={closeDrawer}>
            &times;
          </button>
        </div>
        
        <div className="drawer-content">
          <form>
            {/* Case Number */}
            <div className="form-group">
              <label>Case No.</label>
              <input type="text" className="form-control" placeholder="000000" />
            </div>

            {/* Date & Time */}
            <div className="form-group date-time-container">
              <div className="date-input">
                <input type="number" className="form-control" placeholder="Month" />
              </div>
              <div className="date-input">
                <input type="number" className="form-control" placeholder="Day" />
              </div>
              <div className="date-input">
                <input type="number" className="form-control" placeholder="Year" />
              </div>
              <div className="date-input">
                <input type="time" className="form-control" />
              </div>
            </div>

            {/* Location */}
            <div className="form-group">
              <label>Location:</label>
              <input type="text" className="form-control" />
            </div>

            {/* Parties Involved */}
            <div className="form-group">
              <label>Parties Involved (Victim, Offender, Witness):</label>
              <input type="text" className="form-control" />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description of the Incident:</label>
              <textarea className="form-control" rows="4" placeholder="Factual Narrative"></textarea>
            </div>

            {/* Date Reported */}
            <div className="form-group">
              <label>Date Reported:</label>
              <input type="date" className="form-control" />
            </div>

            {/* Status */}
            <div className="form-group">
              <label>Status:</label>
              <select className="form-control">
                <option>Unresolved</option>
                <option>Resolved</option>
              </select>
            </div>

            {/* Scheduled Meeting */}
            <div className="form-group">
              <label>Scheduled Meeting:</label>
              <input type="text" className="form-control" />
            </div>

            {/* Meeting Type */}
            <div className="form-group">
              <label>Meeting Type:</label>
              <input type="text" className="form-control" />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-success w-100">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddViolations;
