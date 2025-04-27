import React, { useState, useEffect } from "react";
import "./ContactParent.css";
import { ref, get } from "firebase/database";
import { db } from "../../firebase/firebaseConfig";
import { IoMdClose } from "react-icons/io";

const ContactParent = ({ violationId, onClose }) => {
  const [violationData, setViolationData] = useState(null);

  useEffect(() => {
    const fetchViolationDetails = async () => {
      try {
        const violationRef = ref(db, `violations/${violationId}`);
        const snapshot = await get(violationRef);
        if (snapshot.exists()) {
          setViolationData(snapshot.val());
        } else {
          console.error("Violation data not found.");
        }
      } catch (error) {
        console.error("Error fetching violation details:", error);
      }
    };

    fetchViolationDetails();
  }, [violationId]);

  if (!violationData) {
    return null; // Or a loading spinner if you want
  }

  return (
    <div className="contact-parent-overlay">
      <div className="contact-parent-panel">
        <div className="contact-parent-header">
          <h4>Contact Parent/Guardian</h4>
          <IoMdClose
            size={20}
            style={{ cursor: "pointer" }}
            onClick={onClose}
          />
        </div>

        <div className="contact-parent-body">
          <p><strong>Student Name:</strong> {violationData.offender || "N/A"}</p>
          <p><strong>Status:</strong> {violationData.status || "N/A"}</p>
          <p><strong>Violation Category:</strong> {violationData.violationCategory || "N/A"}</p>
          <p><strong>Violation Type:</strong> {violationData.type || "N/A"}</p>
          <p><strong>Time Reported:</strong> {violationData.Time || "N/A"}</p>
          <p><strong>Notes:</strong> {violationData.notes || "N/A"}</p>
        </div>

        <div className="contact-parent-footer">
          <button className="sms-btn">Send SMS</button>
          <button className="email-btn">Send Email</button>
        </div>
      </div>
    </div>
  );
};

export default ContactParent;
