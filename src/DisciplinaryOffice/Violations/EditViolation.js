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
    await update(violationRef, violationData)
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
      <div className="drawer open">
        <div className="drawer-container">
          <header className="drawer-header">
            <h5 className="mb-0 text-white fw-bold">Edit Violation</h5>
            <div className="header-actions">
              <button className="close-btn" onClick={onClose}>
                <IoMdClose size={24} />
              </button>
            </div>
          </header>

          <div className="drawer-body">
            <label>Student Name:</label>
            <input
              type="text"
              name="offender"
              value={violationData.offender || ""}
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

            <label>Status:</label>
            <select
              name="status"
              value={violationData.status || ""}
              onChange={handleChange}
            >
              <option value="Unresolved">Unresolved</option>
              <option value="Resolved">Resolved</option>
            </select>

            <label>Location:</label>
            <input
              type="text"
              name="Location"
              value={violationData.Location || ""}
              onChange={handleChange}
            />

            <label>Description (Notes):</label>
            <textarea
              name="notes"
              value={violationData.notes || ""}
              onChange={handleChange}
            />

            <label>Time of Incident:</label>
            <input
              type="text"
              name="Time"
              value={violationData.Time || ""}
              onChange={handleChange}
            />

            <button className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditViolation;
