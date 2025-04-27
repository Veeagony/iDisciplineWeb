import React, { useState, useEffect } from "react";
import { ref, get, update } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";
import { IoMdClose } from "react-icons/io";
import "./EditViolation.css";

const EditViolation = ({ violationId, onClose }) => {
  const [violationData, setViolationData] = useState(null);

  useEffect(() => {
    const fetchViolation = async () => {
      const violationRef = ref(db, `violations/${violationId}`);
      const snapshot = await get(violationRef);
      if (snapshot.exists()) {
        setViolationData(snapshot.val());
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

    const updateMessage = `Record updated at ${currentDateTime}`;

    const updatedViolation = {
      ...violationData,
      updates: violationData.updates
        ? [...violationData.updates, updateMessage]
        : [updateMessage],
    };

    await update(violationRef, updatedViolation)
      .then(() => {
        alert("Violation updated successfully!");
        onClose();
      })
      .catch((error) => {
        console.error("Error updating violation:", error);
        alert("Failed to update violation.");
      });
  };

  if (!violationData) {
    return <div className="loading">Loading violation details...</div>;
  }

  return (
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
          {/* Case No. (readonly) */}
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
            <input
              type="text"
              name="Date"
              value={violationData.Date || ""}
              onChange={handleChange}
              placeholder="Date (e.g. April 28, 2025)"
            />
            <input
              type="text"
              name="Time"
              value={violationData.Time || ""}
              onChange={handleChange}
              placeholder="Time (e.g. 10:30 PM)"
            />
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

          <label>Parties Involved:</label>
          <input
            type="text"
            name="Victim"
            placeholder="Victim"
            value={violationData.Victim || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="offender"
            placeholder="Offender"
            value={violationData.offender || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Witness"
            placeholder="Witness"
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
          <input
            type="text"
            name="DateReported"
            value={violationData.DateReported || ""}
            readOnly
          />

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditViolation;
