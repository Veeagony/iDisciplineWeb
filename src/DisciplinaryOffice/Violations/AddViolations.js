import React, { useState, useEffect } from "react";
import "./AddViolations.css";
import { db } from "../../firebase/firebaseConfig";
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

  // Fetch student list from Firebase
  // We assume each student record has a "studentId" property with values like "0002", "0003", etc.
  useEffect(() => {
    const studentsRef = ref(db, "students");
    const unsubscribe = onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentsArray = Object.entries(data).map(([key, student]) => ({
          id: key,
          studentId: student.studentId, // use the studentId property from the record
          fullName: `${student.firstName} ${student.middleName ? student.middleName + " " : ""}${student.lastName}`,
        }));
        setStudentList(studentsArray);
      } else {
        setStudentList([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Set current date for Date Reported
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    setDateReported(formattedDate);
  }, []);

  // Generate a unique Case No.
  useEffect(() => {
    const generatedCaseNo = `C-${Math.floor(Math.random() * 1000000)}`;
    setCaseNo(generatedCaseNo);
  }, []);

  // Handle offender input change
  const handleOffenderChange = (e) => {
    const value = e.target.value;
    setOffender(value);
    setOffenderStudentId(""); // reset student id if editing manually
    if (value.length >= 2) {
      const filteredSuggestions = studentList.filter((student) =>
        student.fullName.toLowerCase().includes(value.toLowerCase())
      );
      setOffenderSuggestions(filteredSuggestions);
    } else {
      setOffenderSuggestions([]);
    }
  };

  // When an offender is chosen, set both the name and the student id
  const handleOffenderSuggestionClick = (student) => {
    setOffender(student.fullName);
    setOffenderStudentId(student.studentId);
    setOffenderSuggestions([]);
  };

  // Handle victim input change and suggestion selection
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
    // Validate if all essential fields are filled
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

    // Validate Offender exists in the student list
    if (offender && !studentList.some((student) => student.fullName === offender)) {
      alert("The entered offender is not in the student list.");
      return;
    }

    // Validate Victim exists in the student list
    if (victim && !studentList.some((student) => student.fullName === victim)) {
      alert("The entered victim is not in the student list.");
      return;
    }

    // Build the new violation object; include offender's student id
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
      studentId: offenderStudentId, // this will be shown in the table under Student ID
      Witness: witness,
      notes: description,
      DateReported: dateReported,
    };

    addViolation(newViolation);
    closeDrawer();
  };

  return (
    <div className="drawer">
      <div className="drawer-header">
        <span className="drawer-title">Violation</span>
        <button className="close-btn" onClick={closeDrawer}>
          ×
        </button>
      </div>

      <div className="form">
        <label className="drawer-title">CASE NO.</label>
        <input type="text" placeholder="" value={caseNo} readOnly />

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Unresolved">Unresolved</option>
          <option value="Resolved">Resolved</option>
        </select>

        <label>Date & Time of the incident:</label>
        <div className="date-time">
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">Month</option>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m, i) => (
              <option key={i} value={m}>
                {m}
              </option>
            ))}
          </select>

          <select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">Day</option>
            {[...Array(31)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Year</option>
            {[2026, 2025, 2024, 2023, 2022].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>

          <input type="time" step="1" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>

        <label>Location:</label>
        <input type="text" placeholder="" value={location} onChange={(e) => setLocation(e.target.value)} />

        <label>Violation Category:</label>
        <select value={violationCategory} onChange={(e) => setViolationCategory(e.target.value)}>
          <option value="">Select Violation Category</option>
          <option value="Minor Offense">Minor Offense</option>
          <option value="Major Offense">Major Offense</option>
        </select>

        <label>Violation Type:</label>
        <input type="text" placeholder="" value={violationType} onChange={(e) => setViolationType(e.target.value)} />

        <label>Parties Involved (Victim, Offender, Witness):</label>

        <label>Victim:</label>
        <div className="autocomplete-input">
          <input type="text" placeholder="" value={victim} onChange={handleVictimChange} />
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
        <div className="dot blue"></div>

        <label>Offender:</label>
        <div className="autocomplete-input">
          <input type="text" placeholder="" value={offender} onChange={handleOffenderChange} />
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
        <div className="dot blue"></div>

        <label>Witness:</label>
        <input type="text" placeholder="" value={witness} onChange={(e) => setWitness(e.target.value)} />
        <div className="dot blue"></div>

        <label>Description of the Incident (Factual Narrative):</label>
        <textarea placeholder="" value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Date Reported:</label>
        <input type="text" placeholder="" value={dateReported} readOnly />

        <button className="add-btn" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddViolations;
