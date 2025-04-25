import React, { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import "./AddStudentForm.css";

const AddStudentForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "Female",
    address: "",
    year: "Seventh",
    section: "St. John",
    adviser: "Jovenilicious",
    parent: "",
    email: "",
    phone: "",
  });
  
  // New state for image file and preview URL
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "phone" && !/^\d*$/.test(value)) return;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Create and store a preview URL string
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ensure all fields including the image are filled
    const allFilled = Object.keys(formData).every(
      (key) => formData[key] && formData[key].toString().trim() !== ""
    );
    if (!allFilled || !imageFile) {
      alert("Please fill out all fields and upload an image.");
      return;
    }
    // Save the form data with the preview image URL
    const finalData = { ...formData, image: previewImage };
    onSubmit(finalData);
    // Reset form when submission is complete
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "Female",
      address: "",
      year: "Seventh",
      section: "St. John",
      adviser: "Jovenilicious",
      parent: "",
      email: "",
      phone: "",
    });
    setImageFile(null);
    setPreviewImage(null);
    onClose();
  };

  return (
    <div className={`add-student-drawer ${isOpen ? "open" : ""}`}>
      {/* Header */}
      <div className="drawer-banner d-flex justify-content-between align-items-center px-4 py-3">
        <h5 className="mb-0 text-white fw-bold">Create a New Student</h5>
        <IoMdClose
          size={24}
          onClick={onClose}
          className="text-white"
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Body */}
      <div className="drawer-body p-4">
        {/* Image Upload */}
        <div className="image-upload-box d-flex justify-content-center mb-4" onClick={handleImageClick}>
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="image-preview" />
          ) : (
            <div className="image-placeholder text-center d-flex align-items-center justify-content-center">
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

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Left: Student Info */}
            <div className="col-md-6">
              <div className="mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Middle Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="middleName"
                  value={formData.middleName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Gender</label>
                <select className="form-select" id="gender" value={formData.gender} onChange={handleChange}>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Year</label>
                <select className="form-select" id="year" value={formData.year} onChange={handleChange}>
                  <option>Seventh</option>
                  <option>Eight</option>
                  <option>Ninth</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="form-label">Section</label>
                <select className="form-select" id="section" value={formData.section} onChange={handleChange}>
                  <option>St. John</option>
                  <option>St. Luke</option>
                  <option>St. Matthew</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="form-label">Adviser</label>
                <select className="form-select" id="adviser" value={formData.adviser} onChange={handleChange}>
                  <option>Jovenilicious</option>
                  <option>Sir Karl</option>
                </select>
              </div>
            </div>

            {/* Right: Emergency Contact */}
            <div className="col-md-6">
              <h6 className="fw-bold text-primary mb-3">Emergency Contact</h6>
              <div className="mb-2">
                <label className="form-label">Parent/Guardian</label>
                <input type="text" className="form-control" id="parent" value={formData.parent} onChange={handleChange} />
              </div>
              <div className="mb-2">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="mb-4">
                <label className="form-label">Contact No.</label>
                <input type="tel" className="form-control" id="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="text-end mt-3">
            <button type="submit" className="addbtn">
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
