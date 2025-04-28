import React, { useState, useEffect } from 'react';
import { FaTimes, FaSearch, FaUsers } from 'react-icons/fa';
import './AddIncidentReport.css';

const AddIncidentReport = ({ isOpen, onClose, onSubmit }) => {
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    month: '',
    day: '',
    year: '',
    time: '',
    location: '',
    violationCategory: '',
    violationType: '',
    victim: '',
    offender: '',
    witness: '',
    description: '',
    reportedBy: '',
  });

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen && !isVisible) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('drawer-overlay')) {
      handleClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.month ||
      !formData.day ||
      !formData.year ||
      !formData.time ||
      !formData.location ||
      !formData.violationCategory ||
      !formData.violationType ||
      !formData.description
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const currentDate = new Date();
    const formattedDateReported = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

    const newReport = {
      violationCategory: formData.violationCategory,
      violationType: formData.violationType,
      dateSent: `${formData.month} ${formData.day}, ${formData.year} - ${formData.time}`,
      location: formData.location,
      victim: formData.victim,
      offender: formData.offender,
      witness: formData.witness,
      description: formData.description,
      reportedBy: formData.reportedBy || 'Auto-filled Admin',
      dateReported: formattedDateReported,
    };

    onSubmit(newReport);
    handleClose();
  };

  return (
    <div className="drawer-overlay" onClick={handleOverlayClick}>
      <div className={`drawer-content ${!isVisible ? 'closing' : ''}`}>
        <div className="drawer-header">
          <h2>Make an Incident Report</h2>
          <FaTimes className="close-icon" onClick={handleClose} />
        </div>

        <form className="incident-form" onSubmit={handleSubmit}>
          {/* Date & Time */}
          <label>Date & Time of the incident:</label>
          <div className="datetime-fields">
            <select name="month" value={formData.month} onChange={handleChange}>
              <option value="">Month</option>
              {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select name="day" value={formData.day} onChange={handleChange}>
              <option value="">Day</option>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
            <select name="year" value={formData.year} onChange={handleChange}>
              <option value="">Year</option>
              {['2024', '2025', '2026'].map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          {/* Location */}
          <label>Location:</label>
          <input
            type="text"
            name="location"
            placeholder="Enter Location"
            value={formData.location}
            onChange={handleChange}
          />

          {/* Violation */}
          <label>Violation Category:</label>
          <select
            name="violationCategory"
            value={formData.violationCategory}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Major Offense">Major Offense</option>
            <option value="Minor Offense">Minor Offense</option>
          </select>

          <label>Violation Type:</label>
          <select
            name="violationType"
            value={formData.violationType}
            onChange={handleChange}
          >
            <option value="">Select Type</option>
            {[
              'Bullying',
              'Fighting',
              'Cheating',
              'Vandalism',
              'Tardiness',
              'Cutting Classes',
              'Disrespect',
              'Unauthorized Absence',
              'Possession of Prohibited Items',
            ].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Parties Involved */}
          <label>Parties Involved (Victim, Offender, Witness):</label>
          <div className="party-field">
            <input
              type="text"
              name="victim"
              placeholder="Victim"
              value={formData.victim}
              onChange={handleChange}
            />
            <FaSearch className="search-icon" />
            <FaUsers className="group-icon" />
          </div>
          <div className="party-field">
            <input
              type="text"
              name="offender"
              placeholder="Offender"
              value={formData.offender}
              onChange={handleChange}
            />
            <FaSearch className="search-icon" />
            <FaUsers className="group-icon" />
          </div>
          <div className="party-field">
            <input
              type="text"
              name="witness"
              placeholder="Witness"
              value={formData.witness}
              onChange={handleChange}
            />
            <FaSearch className="search-icon" />
            <FaUsers className="group-icon" />
          </div>

          {/* Description */}
          <label>Description of the Incident (Factual Narrative):</label>
          <textarea
            name="description"
            placeholder="Describe the incident..."
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          {/* Reported By */}
          <label>Reported By:</label>
          <input
            type="text"
            name="reportedBy"
            placeholder="Enter Reporter Name"
            value={formData.reportedBy}
            onChange={handleChange}
          />

          {/* Date Reported */}
          <label>Date Reported:</label>
          <div className="readonly-field">
            {new Date().toLocaleDateString()}
          </div>

          {/* Submit */}
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddIncidentReport;
