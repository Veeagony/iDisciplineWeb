import React, { useState, useEffect } from "react";
import "./AddViolations.css";
import { db } from "../../firebase/firebaseConfig";
import { IoMdClose } from "react-icons/io";
import { ref, onValue } from "firebase/database";

const AddViolations = ({ closeDrawer, addViolation }) => {
  const [caseNo, setCaseNo] = useState("");
  const [status, setStatus] = useState("Unresolved");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [violationCategory, setViolationCategory] = useState("");
  const [violationType, setViolationType] = useState("");
  const [victim, setVictim] = useState("");
  const [offender, setOffender] = useState("");
  const [offenderStudentId, setOffenderStudentId] = useState("");
  const [witness, setWitness] = useState("");
  const [description, setDescription] = useState("");
  const [dateReported, setDateReported] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [offenderSuggestions, setOffenderSuggestions] = useState([]);
  const [victimSuggestions, setVictimSuggestions] = useState([]);

  useEffect(() => {
    const studentsRef = ref(db, "students");
    const unsubscribe = onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentsArray = Object.entries(data).map(([key, student]) => ({
          id: key,
          studentId: student.studentId,
          fullName: `${student.firstName} ${student.middleName ? student.middleName + " " : ""}${student.lastName}`,
        }));
        setStudentList(studentsArray);
      } else {
        setStudentList([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    setDateReported(formattedDate);
  }, []);

  useEffect(() => {
    const generatedCaseNo = `C-${Math.floor(Math.random() * 1000000)}`;
    setCaseNo(generatedCaseNo);
  }, []);

  const handleOffenderChange = (e) => {
    const value = e.target.value;
    setOffender(value);
    setOffenderStudentId("");
    if (value.length >= 2) {
      const filteredSuggestions = studentList.filter((student) =>
        student.fullName.toLowerCase().includes(value.toLowerCase())
      );
      setOffenderSuggestions(filteredSuggestions);
    } else {
      setOffenderSuggestions([]);
    }
  };

  const handleOffenderSuggestionClick = (student) => {
    setOffender(student.fullName);
    setOffenderStudentId(student.studentId);
    setOffenderSuggestions([]);
  };

  const handleVictimChange = (e) => {
    const value = e.target.value;
    setVictim(value);
    if (value.length >= 2) {
      const filteredSuggestions = studentList.filter((student) =>
        student.fullName.toLowerCase().includes(value.toLowerCase())
      );
      setVictimSuggestions(filteredSuggestions);
    } else {
      setVictimSuggestions([]);
    }
  };

  const handleVictimSuggestionClick = (fullName) => {
    setVictim(fullName);
    setVictimSuggestions([]);
  };

  const handleSubmit = () => {
    if (
      !caseNo ||
      !month ||
      !day ||
      !year ||
      !time ||
      !location ||
      !violationCategory ||
      !violationType ||
      !description ||
      !dateReported
    ) {
      alert("Please fill out all the required fields!");
      return;
    }

    const newViolation = {
      status,
      caseNo,
      Date: `${month} ${day}, ${year}`,
      Time: time,
      Location: location,
      violationCategory,
      type: violationType,
      Victim: victim,
      offender: offender,
      studentId: offenderStudentId,
      Witness: witness,
      notes: description,
      DateReported: dateReported,
    };

    addViolation(newViolation);
    closeDrawer();
  };

  return (
    <div className="drawer-overlay">
      <div className="add-violation-drawer">
        <div className="drawer-header">
          <h5>Add Violation</h5>
          <IoMdClose
            size={24}
            onClick={closeDrawer}
            style={{ cursor: "pointer", color: "white" }}
          />
        </div>

        <div className="drawer-body">
          <div className="case-section">
            <h2>Case No.</h2>
            <input type="text" value={caseNo} readOnly />
          </div>

          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Unresolved">Unresolved</option>
            <option value="Resolved">Resolved</option>
          </select>

          <label>Date & Time of the incident:</label>
          <div className="date-grid">
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
            <input type="time" step="1" value={time} onChange={(e) => setTime(e.target.value)} />
          </div>

          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />

          <label>Violation Category:</label>
          <select value={violationCategory} onChange={(e) => setViolationCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Minor Offense">Minor Offense</option>
            <option value="Major Offense">Major Offense</option>
          </select>

          <label>Violation Type:</label>
          <input type="text" value={violationType} onChange={(e) => setViolationType(e.target.value)} />

          <label>Parties Involved (Victim, Offender, Witness):</label>

          <div className="autocomplete-field">
            <label>Victim:</label>
            <input type="text" value={victim} onChange={handleVictimChange} />
            {victimSuggestions.length > 0 && (
              <ul className="autocomplete-suggestions">
                {victimSuggestions.map((student) => (
                  <li key={student.fullName} onClick={() => handleVictimSuggestionClick(student.fullName)}>
                    {student.fullName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="autocomplete-field">
            <label>Offender:</label>
            <input type="text" value={offender} onChange={handleOffenderChange} />
            {offenderSuggestions.length > 0 && (
              <ul className="autocomplete-suggestions">
                {offenderSuggestions.map((student) => (
                  <li key={student.fullName} onClick={() => handleOffenderSuggestionClick(student)}>
                    {student.fullName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {offenderStudentId && (
            <>
              <label>Student ID:</label>
              <input type="text" value={offenderStudentId} readOnly />
            </>
          )}

          <label>Witness:</label>
          <input type="text" value={witness} onChange={(e) => setWitness(e.target.value)} />

          <label>Description of the Incident (Factual Narrative):</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

          <label>Date Reported:</label>
          <input type="text" value={dateReported} readOnly />

          <button className="add-btn" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddViolations;
