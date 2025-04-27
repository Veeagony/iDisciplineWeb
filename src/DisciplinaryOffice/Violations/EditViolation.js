import React, { useState, useEffect } from "react";
import { ref, get, update } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";
import { IoMdClose } from "react-icons/io";
import "./EditViolation.css";

const EditViolation = ({ violationId, onClose }) => {
  const [violationData, setViolationData] = useState(null);
  const [oldData, setOldData] = useState(null);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [time, setTime] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const fetchViolation = async () => {
      const violationRef = ref(db, `violations/${violationId}`);
      const snapshot = await get(violationRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setViolationData(data);
        setOldData(data); // ✅ Save old data for comparison

        if (data.Date) {
          const [monthVal, dayVal, yearVal] = data.Date.replace(",", "").split(" ");
          setMonth(monthVal);
          setDay(dayVal);
          setYear(yearVal);
        }
        setTime(data.Time || "");
      } else {
        console.error("Violation not found.");
      }
    };
    fetchViolation();
  }, [violationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setViolationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!violationData) return;

    const violationRef = ref(db, `violations/${violationId}`);
    const currentDateTime = new Date().toLocaleString();
    const changes = [];

    if (violationData.status !== oldData.status) {
      changes.push(`Status changed to ${violationData.status} on ${currentDateTime}`);
    }
    if (violationData.Victim !== oldData.Victim) {
      changes.push(`Victim updated on ${currentDateTime}`);
    }
    if (violationData.Witness !== oldData.Witness) {
      changes.push(`Witness updated on ${currentDateTime}`);
    }
    if (violationData.Location !== oldData.Location) {
      changes.push(`Location updated on ${currentDateTime}`);
    }
    if (violationData.type !== oldData.type) {
      changes.push(`Violation Type updated on ${currentDateTime}`);
    }
    if (violationData.violationCategory !== oldData.violationCategory) {
      changes.push(`Violation Category updated on ${currentDateTime}`);
    }

    const updatedViolation = {
      ...violationData,
      Date: `${month} ${day}, ${year}`,
      Time: time,
      updates: violationData.updates
        ? [...violationData.updates, ...changes]
        : [...changes],
    };

    await update(violationRef, updatedViolation)
      .then(() => {
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          onClose();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating violation:", error);
        alert("Failed to update violation.");
      });
  };

  const Toast = ({ message }) => (
    <div className="toast">
      {message}
    </div>
  );

  if (!violationData) {
    return <div className="loading">Loading violation details...</div>;
  }

  return (
    <>
      {showToast && <Toast message="Saved Successfully!" />}
      <div className="drawer-overlay">
        <div className="edit-violation-drawer">
          <div className="drawer-header">
            <h5>Edit Violation</h5>
            <IoMdClose
              size={24}
              onClick={onClose}
              style={{ cursor: "pointer", color: "white" }}
            />
          </div>

          <div className="drawer-body">
            <div className="case-section">
              <h2>Case No.</h2>
              <input type="text" value={violationData.caseNo || ""} readOnly />
            </div>

            <label>Status:</label>
            <select
              name="status"
              value={violationData.status || ""}
              onChange={handleChange}
            >
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
            <input
              type="text"
              name="Location"
              value={violationData.Location || ""}
              onChange={handleChange}
            />

            <label>Violation Category:</label>
            <select
              name="violationCategory"
              value={violationData.violationCategory || ""}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Minor Offense">Minor Offense</option>
              <option value="Major Offense">Major Offense</option>
            </select>

            <label>Violation Type:</label>
            <input
              type="text"
              name="type"
              value={violationData.type || ""}
              onChange={handleChange}
            />

            <label>Victim:</label>
            <input
              type="text"
              name="Victim"
              value={violationData.Victim || ""}
              onChange={handleChange}
            />

            <label>Offender:</label>
            <input type="text" value={violationData.offender || ""} readOnly />

            <label>Witness:</label>
            <input
              type="text"
              name="Witness"
              value={violationData.Witness || ""}
              onChange={handleChange}
            />

            <label>Description (Notes):</label>
            <textarea
              name="notes"
              value={violationData.notes || ""}
              onChange={handleChange}
            />

            <label>Date Reported:</label>
            <input type="text" value={violationData.DateReported || ""} readOnly />

            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditViolation;
