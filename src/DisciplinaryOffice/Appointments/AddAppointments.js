import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./AddAppointments.css";
import { db } from "../../firebase/firebaseConfig";
import { ref, push, set } from "firebase/database";
import { FaTimes } from "react-icons/fa";

const AddAppointments = ({ closeDrawer, violations, addAppointment, markCalendarDate }) => {
  const [selectedCase, setSelectedCase] = useState("");
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [datetime, setDatetime] = useState(new Date());
  const [meetingType, setMeetingType] = useState("PTC");
  const [briefDesc, setBriefDesc] = useState("");

  useEffect(() => {
    if (selectedCase) {
      const violation = violations.find((v) => v.caseNo === selectedCase);
      setSelectedViolation(violation);
    }
  }, [selectedCase, violations]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAppointment = {
      caseNo: selectedCase,
      studentName: selectedViolation?.offender || "",
      status: selectedViolation?.status || "",
      violationCategory: selectedViolation?.violationCategory || "",
      violationType: selectedViolation?.violationType || "",
      timeReported: selectedViolation?.Date || "",
      briefDesc,
      datetime: datetime.toISOString(),
      meetingType,
    };

    try {
      const newRef = push(ref(db, "appointments"));
      await set(newRef, newAppointment);
      const savedAppointment = { ...newAppointment, id: newRef.key };
      addAppointment(savedAppointment);
      markCalendarDate(new Date(savedAppointment.datetime));
      closeDrawer(); // Close the drawer by calling the parent's function
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  return (
    <div className="add-appointments-drawer open">
      <div className="drawer-overlay" onClick={closeDrawer}></div>
      <div className="drawer-content">
        <div className="drawer-header">
          <h3 className="form-title">Set an Appointment</h3>
          <button className="close-button" onClick={closeDrawer}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="appointment-form">
          {/* Case Number */}
          <div className="form-group">
            <label htmlFor="caseNo">Case No.</label>
            <select
              id="caseNo"
              className="form-control case-select"
              value={selectedCase}
              onChange={(e) => setSelectedCase(e.target.value)}
              required
            >
              <option value="">Select Case</option>
              {violations
                .filter((v) => v.status !== "Archive")
                .map((v) => (
                  <option key={v.id} value={v.caseNo}>
                    {v.caseNo}
                  </option>
                ))}
            </select>
          </div>

          {/* Student Information */}
          <div className="info-group">
            <div className="info-item">
              <span className="info-label">Student Name:</span>
              <div className="info-value">{selectedViolation?.offender || ""}</div>
            </div>
            <div className="info-row">
              <div className="info-item">
                <span className="info-label">Status:</span>
                <div className="info-value">{selectedViolation?.status || ""}</div>
              </div>
              <div className="info-item">
                <span className="info-label">Violation Category:</span>
                <div className="info-value">{selectedViolation?.violationCategory || ""}</div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-item">
                <span className="info-label">Violation Type:</span>
                <div className="info-value">{selectedViolation?.violationType || ""}</div>
              </div>
              <div className="info-item">
                <span className="info-label">Time Reported:</span>
                <div className="info-value">{selectedViolation?.Date || ""}</div>
              </div>
            </div>
          </div>

          {/* Brief Description */}
          <div className="form-group">
            <label htmlFor="briefDesc">Brief Description:</label>
            <textarea
              id="briefDesc"
              className="form-control desc-textarea"
              value={briefDesc}
              onChange={(e) => setBriefDesc(e.target.value)}
              required
            />
          </div>

          {/* Date & Time and Meeting Type */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="datetime">Date &amp; Time:</label>
              <DatePicker
                id="datetime"
                selected={datetime}
                onChange={(date) => setDatetime(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="form-control"
                minDate={new Date()}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="meetingType">Meeting Type:</label>
              <select
                id="meetingType"
                className="form-control"
                value={meetingType}
                onChange={(e) => setMeetingType(e.target.value)}
                required
              >
                <option value="PTC">PTC</option>
                <option value="Counseling">Counseling</option>
              </select>
            </div>
          </div>

          {/* Add Button */}
          <div className="form-actions">
            <button type="submit" className="btn-add">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointments;
