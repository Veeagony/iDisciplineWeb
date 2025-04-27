import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import "./EditStudentForm.css";

const yearSectionOptions = {
  "7th Grade": ["St. Pedro", "St. Aloysious", "St. Dominic"],
  "8th Grade": ["St. Stephen", "St. Maximillian", "St. Lorenzo"],
  "9th Grade": ["St. Philip", "St. Andrew", "St. Bartholomew"],
  "10th Grade": ["St. Matthew", "St. John", "St. Paul"],
  "11th Grade": ["St. John Bosco", "St. Vincent"],
  "12th Grade": ["St. Benedict", "St. Sebastian"],
};

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
    parentGuardian: "",
    image: ""
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

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
        parentGuardian: student.parentGuardian || "",
        image: student.image || "",
      });
      setPreviewImage(student.image || null);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "year" && { section: "" }) // Reset section if year changes
    }));
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
      setFormData((prev) => ({
        ...prev,
        image: previewURL
      }));
    }
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

  const availableSections = yearSectionOptions[formData.year] || [];

  return (
    <div className={`edit-student-drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-header">
        <h5 className="mb-0 text-white fw-bold">Edit Student</h5>
        <IoMdClose size={24} onClick={onClose} className="close-btn" />
      </div>

      <form className="drawer-body" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-center mb-4">
          <div className="image-upload-box" onClick={handleImageClick}>
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="image-preview" />
            ) : (
              <div className="image-placeholder-lg d-flex align-items-center justify-content-center">
                Upload Image
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} />
          </div>
          <div className="col-6">
            <label className="form-label text-primary fw-semibold">Parent/Guardian</label>
            <input type="text" className="form-control" name="parentGuardian" value={formData.parentGuardian} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label className="form-label">Middle Name</label>
            <input type="text" className="form-control" name="middleName" value={formData.middleName} onChange={handleChange} />
          </div>
          <div className="col-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} />
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
            <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="col-6">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <label className="form-label">Year</label>
            <select className="form-select" name="year" value={formData.year} onChange={handleChange}>
              <option value="">Select Year</option>
              {Object.keys(yearSectionOptions).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <label className="form-label">Section</label>
            <select className="form-select" name="section" value={formData.section} onChange={handleChange}>
              <option value="">Select Section</option>
              {availableSections.map((section) => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>
          <div className="col-4">
            <label className="form-label">Adviser</label>
            <select className="form-select" name="adviser" value={formData.adviser} onChange={handleChange}>
              <option value="">Select Adviser</option>
              <option>Sir Karl</option>
              <option>Sir Dan</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button className="btn btn-primary" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudentForm;
