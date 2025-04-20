import React, { useState } from "react";
import "./AddViolations.css"; 

const AddViolations = ({ closeDrawer, addViolation }) => {
  const [caseNo, setCaseNo] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [violationCategory, setViolationCategory] = useState("Minor Offense");
  const [violationType, setViolationType] = useState("");
  const [firstName, setFirstName] = useState("");  // First Name
  const [lastName, setLastName] = useState("");    // Last Name
  const [partiesInvolved, setPartiesInvolved] = useState("");
  const [victim, setVictim] = useState("");
  const [offender, setOffender] = useState("");
  const [witness, setWitness] = useState("");
  const [description, setDescription] = useState("");
  const [dateReported, setDateReported] = useState("");
  const [status, setStatus] = useState("Unresolved");

  const handleSubmit = () => {
    // Validate if all fields are filled
    if (
      !caseNo || !month || !day || !year || !time || !location || !violationCategory ||
      !violationType || !firstName || !lastName || !partiesInvolved || !victim || !offender || !witness ||
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
      violationType,
      time, 
      location,
      partiesInvolved,  
      victim,
      offender,
      witness,
      description,
      dateReported,
    };
  
    addViolation(newViolation); // Pass all fields when adding the violation
    closeDrawer();  // Close the drawer after submitting
  };
  

  return (
    <div className="drawer">
      <div className="drawer-header">
        <h2 className="drawer-title">Violation</h2>
        <button className="close-btn" onClick={closeDrawer}>X</button>
      </div>

      <div className="form">
        <label>CASE NO.</label>
        <input
          type="text"
          placeholder="Enter Case No."
          value={caseNo}
          onChange={(e) => setCaseNo(e.target.value)}
        />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Unresolved">Unresolved</option>
          <option value="Resolved">Resolved</option>
        </select>

        {/* First Name and Last Name fields */}
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

        <label>Violence Category</label>
        <select value={violationCategory} onChange={(e) => setViolationCategory(e.target.value)}>
          <option value="Minor Offense">Minor Offense</option>
          <option value="Major Offense">Major Offense</option>
        </select>

        <label>Violation Type:</label>
        <input
          type="text"
          placeholder="Enter Type"
          value={violationType}
          onChange={(e) => setViolationType(e.target.value)}
        />

        <label>Date & Time of the incident:</label>
        <div className="date-time">
          <input type="text" placeholder="Month" value={month} onChange={(e) => setMonth(e.target.value)} />
          <input type="text" placeholder="Day" value={day} onChange={(e) => setDay(e.target.value)} />
          <input type="text" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} />
          <input type="text" placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>

        <label>Location:</label>
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Parties Involved:</label>  
        <input
          type="text"
          placeholder="Victim, Offender, Witness"
          value={partiesInvolved}
          onChange={(e) => setPartiesInvolved(e.target.value)}
        />

        <label>Victim:</label>
        <input
          type="text"
          placeholder="Enter Victim Name"
          value={victim}
          onChange={(e) => setVictim(e.target.value)}
        />

        <label>Offender:</label>
        <input
          type="text"
          placeholder="Enter Offender Name"
          value={offender}
          onChange={(e) => setOffender(e.target.value)}
        />

        <label>Witness:</label>
        <input
          type="text"
          placeholder="Enter Witness Name"
          value={witness}
          onChange={(e) => setWitness(e.target.value)}
        />

        <label>Description of the Incident:</label>
        <textarea
          placeholder="Factual Narrative"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Date Reported:</label>
        <input
          type="text"
          placeholder="Enter Date"
          value={dateReported}
          onChange={(e) => setDateReported(e.target.value)}
        />

        <button className="add-btn" onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export default AddViolations;
