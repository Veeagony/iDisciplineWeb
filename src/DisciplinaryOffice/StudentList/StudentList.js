import React, { useState, useEffect } from "react";
import { FaBell, FaCommentDots } from "react-icons/fa";
import AddStudentForm from "./AddStudentForm";
import StudentDetailsDrawer from "./StudentDetailsForm";
import EditStudentForm from "./EditStudentForm";
import "./StudentList.css";

// 🔥 Firebase imports
import { db } from "../../firebase/firebaseConfig"; // Adjust if needed
import { ref, set, push, onValue, update } from "firebase/database";

const StudentList = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);

  // 🔁 Load students from Firebase on mount
  useEffect(() => {
    const studentsRef = ref(db, "students");
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentList = Object.entries(data).map(([id, student]) => ({
          id,
          ...student,
        }));
        setStudents(studentList);
      } else {
        setStudents([]);
      }
    });
  }, []);

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  const handleAddStudent = (studentData) => {
    const nextIdNumber = students.length + 1;
    const paddedId = String(nextIdNumber).padStart(4, "0");
  
    const newStudentRef = push(ref(db, "students"));
    set(newStudentRef, {
      ...studentData,
      studentId: paddedId, // 👈 This is the formatted ID
    });
  
    setDrawerOpen(false);
  };
  

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setShowDetails(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setShowDetails(false);
    setShowEditDrawer(true);
  };

  const handleSaveEditedStudent = (updatedStudent) => {
    if (!selectedStudent?.id) return;
    const studentRef = ref(db, `students/${selectedStudent.id}`);
    update(studentRef, updatedStudent); // Update in Firebase
    setShowEditDrawer(false);
    setShowDetails(false);
  };

  return (
    <div className="student-list-container d-flex flex-grow-1">
      <div className="student-list-content flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <h2 className="student-title">Students</h2>
            <span className="student-count">{students.length}</span>
            <select className="year-dropdown ms-3">
              <option>Year</option>
            </select>
          </div>
          <div className="d-flex align-items-center gap-3">
            <input className="search-input" placeholder="Search Here" />
            <FaCommentDots className="icon" />
            <FaBell className="icon" />
            <button className="add-student-btn" onClick={toggleDrawer}>
              Add Student
            </button>
          </div>
        </div>

        <table className="student-table mt-4">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Student ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>No of Violations</th>
              <th>No of IR Submitted</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                onClick={() => handleRowClick(student)}
                style={{ cursor: "pointer" }}
              >
                <td><div className="student-photo" /></td>
                <td>{student.studentId || "0001"}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.violations || 0}</td>
                <td>{student.irSubmitted || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddStudentForm
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        onSubmit={handleAddStudent}
      />

      <StudentDetailsDrawer
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        student={selectedStudent}
        onEdit={handleEditStudent}
      />

      <EditStudentForm
        isOpen={showEditDrawer}
        onClose={() => setShowEditDrawer(false)}
        student={selectedStudent}
        onSave={handleSaveEditedStudent}
      />
    </div>
  );
};

export default StudentList;
