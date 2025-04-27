import React, { useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import "./AddStudentForm.css";

const yearSectionOptions = {
  "7th Grade": ["St. Pedro", "St. Aloysious", "St. Dominic"],
  "8th Grade": ["St. Stephen", "St. Maximillian", "St. Lorenzo"],
  "9th Grade": ["St. Philip", "St. Andrew", "St. Bartholomew"],
  "10th Grade": ["St. Matthew", "St. John", "St. Paul"],
  "11th Grade": ["St. John Bosco", "St. Vincent"],
  "12th Grade": ["St. Benedict", "St. Sebastian"],
};

const AddStudentForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "Female",
    address: "",
    year: "",
    section: "",
    adviser: "",
    parent: "",
    email: "",
    phone: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
      ...(id === "year" && { section: "" }), // Reset section if year changes
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
      setImageFile(file);
      const previewURL = URL.createObjectURL(file);
      setPreviewImage(previewURL);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFilled = Object.keys(formData).every(
      (key) => formData[key] && formData[key].toString().trim() !== ""
    );
    if (!allFilled || !imageFile) {
      alert("Please fill out all fields and upload an image.");
      return;
    }
    const finalData = { ...formData, image: previewImage };
    onSubmit(finalData);
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "Female",
      address: "",
      year: "",
      section: "",
      adviser: "",
      parent: "",
      email: "",
      phone: "",
    });
    setImageFile(null);
    setPreviewImage(null);
    onClose();
  };

  const availableSections = yearSectionOptions[formData.year] || [];

  return (
    <div className={`add-student-drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-banner d-flex justify-content-between align-items-center px-4 py-3">
        <h5 className="mb-0 text-white fw-bold">Create a New Student</h5>
        <IoMdClose size={24} onClick={onClose} className="text-white" style={{ cursor: "pointer" }} />
      </div>

      <div className="drawer-body p-4">
        <div className="image-upload-box d-flex justify-content-center mb-4" onClick={handleImageClick}>
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="image-preview" />
          ) : (
            <div className="image-placeholder text-center d-flex align-items-center justify-content-center">
              Upload Image
            </div>
          )}
          <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleImageChange} />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              {/* Student Info */}
              <div className="mb-2"><label className="form-label">First Name</label><input type="text" className="form-control" id="firstName" value={formData.firstName} onChange={handleChange} /></div>
              <div className="mb-2"><label className="form-label">Middle Name</label><input type="text" className="form-control" id="middleName" value={formData.middleName} onChange={handleChange} /></div>
              <div className="mb-2"><label className="form-label">Last Name</label><input type="text" className="form-control" id="lastName" value={formData.lastName} onChange={handleChange} /></div>
              <div className="mb-2"><label className="form-label">Gender</label>
                <select className="form-select" id="gender" value={formData.gender} onChange={handleChange}>
                  <option>Female</option><option>Male</option><option>Other</option>
                </select>
              </div>
              <div className="mb-2"><label className="form-label">Address</label><input type="text" className="form-control" id="address" value={formData.address} onChange={handleChange} /></div>
              <div className="mb-2"><label className="form-label">Year</label>
                <select className="form-select" id="year" value={formData.year} onChange={handleChange}>
                  <option value="">Select Year</option>
                  {Object.keys(yearSectionOptions).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div className="mb-2"><label className="form-label">Section</label>
                <select className="form-select" id="section" value={formData.section} onChange={handleChange}>
                  <option value="">Select Section</option>
                  {availableSections.map((section) => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </select>
              </div>
              <div className="mb-2"><label className="form-label">Adviser</label>
                <select className="form-select" id="adviser" value={formData.adviser} onChange={handleChange}>
                  <option value="">Select Adviser</option>
                  <option>Sir Karl</option>
                  <option>Sir Dan</option>
                </select>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="col-md-6">
              <h6 className="fw-bold text-primary mb-3">Emergency Contact</h6>
              <div className="mb-2"><label className="form-label">Parent/Guardian</label><input type="text" className="form-control" id="parent" value={formData.parent} onChange={handleChange} /></div>
              <div className="mb-2"><label className="form-label">Email</label><input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} /></div>
              <div className="mb-4"><label className="form-label">Contact No.</label><input type="tel" className="form-control" id="phone" value={formData.phone} onChange={handleChange} /></div>
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
