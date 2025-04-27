import React, { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import "./EditStudentForm.css";

const EditStudentForm = ({ isOpen, onClose, student, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    address: "",
    year: "",
    section: "",
    adviser: "",
    email: "",
    phone: "",
    parentGuardian: ""
  });

  useEffect(() => {
    if (student) {
      setFormData({
        firstName: student.firstName || "",
        middleName: student.middleName || "",
        lastName: student.lastName || "",
        gender: student.gender || "",
        address: student.address || "",
        year: student.year || "",
        section: student.section || "",
        adviser: student.adviser || "",
        email: student.email || "",
        phone: student.phone || "",
        parentGuardian: student.parentGuardian || ""
      });
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every(Boolean);
    if (!allFieldsFilled) {
      alert("Please fill in all fields.");
      return;
    }
    onSave?.(formData);
    onClose();
  };

  if (!isOpen || !student) return null;

  return (
    <div className={`edit-student-drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-header">
        <h5 className="mb-0 text-white fw-bold">Edit Student</h5>
        <IoMdClose size={24} onClick={onClose} className="close-btn" />
      </div>

      <form className="drawer-body" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center mb-4">
          <div className="image-placeholder-lg">Upload Image</div>
        </div>

        <div className="row">
          <div className="col-6">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <label className="form-label text-primary fw-semibold">Parent/Guardian</label>
            <input
              type="text"
              className="form-control"
              name="parentGuardian"
              value={formData.parentGuardian}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label className="form-label">Middle Name</label>
            <input
              type="text"
              className="form-control"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <label className="form-label">Contact No.</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) {
                  handleChange(e);
                }
              }}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label className="form-label">Gender</label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>
          <div className="col-6">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label className="form-label">Year</label>
            <select
              className="form-select"
              name="year"
              value={formData.year}
              onChange={handleChange}
            >
              <option value="">Select year</option>
              <option>Seventh</option>
              <option>Eighth</option>
              <option>Ninth</option>
              <option>Tenth</option>
            </select>
          </div>
          <div className="col-4">
            <label className="form-label">Section</label>
            <select
              className="form-select"
              name="section"
              value={formData.section}
              onChange={handleChange}
            >
              <option value="">Select section</option>
              <option>St. John</option>
              <option>St. Peter</option>
              <option>St. Paul</option>
            </select>
          </div>
          <div className="col-4">
            <label className="form-label">Adviser</label>
            <select
              className="form-select"
              name="adviser"
              value={formData.adviser}
              onChange={handleChange}
            >
              <option value="">Select adviser</option>
              <option>Jovenicious</option>
              <option>Sir Dan</option>
              <option>Ms. Claire</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudentForm;
