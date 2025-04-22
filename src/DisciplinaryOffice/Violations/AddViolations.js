import React, { useState } from "react";
import "./AddViolations.css"; 

const AddViolations = ({ closeDrawer, addViolation }) => {
  const [caseNo, setCaseNo] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [violationCategory, setViolationCategory] = useState("");
  const [firstName, setFirstName] = useState("");  // First Name
  const [lastName, setLastName] = useState("");    // Last Name
  const [partiesInvolved, setPartiesInvolved] = useState("");
  const [description, setDescription] = useState("");
  const [dateReported, setDateReported] = useState("");
  const [status, setStatus] = useState("Unresolved");

  const handleSubmit = () => {
    // Validate if all fields are filled
    if (
      !caseNo || !month || !day || !year || !time || !location || !violationCategory || !firstName || !lastName || !partiesInvolved ||
      !description || !dateReported
    ) {
      alert("Please fill out all the fields!");
      return;
    }
  
    const newViolation = {
      status,
      caseNo, 
      Date: `${month} ${day}, ${year}`, 
      firstName,
      lastName,
      violationCategory,
      time, 
      location,
      partiesInvolved,  
      description,
      dateReported,
    };
  
    addViolation(newViolation); // Pass all fields when adding the violation
    closeDrawer();  // Close the drawer after submitting
  };
  

  return (
    <div className="drawer">
  <div className="drawer-header">
    <span className="drawer-title">Add Violation</span>
    <button className="close-btn" onClick={closeDrawer}>×</button>
  </div>

  <div className="form">
  <label className="drawer-title">Case No.</label>
  <input
    type="text"
    placeholder="Enter Case No."
    value={caseNo}
    onChange={(e) => setCaseNo(e.target.value)}
  />

  <label>First Name:</label>
  <input
    type="text"
    placeholder="Enter First Name"
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
  />

  <label>Last Name:</label>
  <input
    type="text"
    placeholder="Enter Last Name"
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
  />
  
<label>Violation Type:</label>
<select
  value={violationCategory}
  onChange={(e) => setViolationCategory(e.target.value)}
>
  <option value="">Select Violation Type</option>
  <option value="Minor Offense">Minor Offense</option>
  <option value="Major Offense">Major Offense</option>
</select>

  <label>Date & Time of the incident:</label>
  <div className="date-time">
    <select value={month} onChange={(e) => setMonth(e.target.value)}>
      <option value="">Month</option>
      {[
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ].map((m, i) => (
        <option key={i} value={m}>{m}</option>
      ))}
    </select>

    <select value={day} onChange={(e) => setDay(e.target.value)}>
      <option value="">Day</option>
      {[...Array(31)].map((_, i) => (
        <option key={i + 1} value={i + 1}>{i + 1}</option>
      ))}
    </select>

    <select value={year} onChange={(e) => setYear(e.target.value)}>
      <option value="">Year</option>
      {[2026, 2025, 2024, 2023, 2022].map((y) => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select>

    <input
      type="text"
      placeholder="Time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
    />
  </div>



    <label>Location:</label>
    <input type="text" placeholder="Enter Location" value={location} onChange={(e) => setLocation(e.target.value)} />

    <label>Parties Involved (Victim, Offender, Witness):</label>
    <input type="text" placeholder="Enter Involved Parties" value={partiesInvolved} onChange={(e) => setPartiesInvolved(e.target.value)} />

    <label>Description of the Incident (Factual Narrative):</label>
    <textarea placeholder="Enter Details" value={description} onChange={(e) => setDescription(e.target.value)} />

    <label>Date Reported:</label>
    <input type="text" placeholder="Enter Date" value={dateReported} onChange={(e) => setDateReported(e.target.value)} />

    <label>Status</label>
    <select value={status} onChange={(e) => setStatus(e.target.value)}>
      <option value="Unresolved">Unresolved</option>
      <option value="Resolved">Resolved</option>
    </select>

    <p className="link-label">Scheduled Meeting</p>
    <p className="link-label">Meeting Type:</p>

    <button className="add-btn" onClick={handleSubmit}>Add</button>
  </div>
</div>

  );
};

export default AddViolations;
