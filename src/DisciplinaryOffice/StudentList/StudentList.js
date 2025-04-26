import React, { useState, useEffect } from "react";
import { FaBell, FaCommentDots, FaUndo, FaTrash } from "react-icons/fa";
import AddStudentForm from "./AddStudentForm";
import StudentDetailsDrawer from "./StudentDetailsForm";
import EditStudentForm from "./EditStudentForm";
import "./StudentList.css";

// 🔥 Firebase imports
import { db } from "../../firebase/firebaseConfig"; // Adjust if needed
import { ref, set, push, onValue, update, remove } from "firebase/database";

const StudentList = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [archivedStudents, setArchivedStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [isArchiveView, setIsArchiveView] = useState(false); // Track whether Archive view is active

  // Load students from Firebase on mount
  useEffect(() => {
    const studentsRef = ref(db, "students");
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentList = Object.entries(data).map(([id, student]) => ({
          id,
          ...student,
        }));
        setStudents(studentList.filter((student) => !student.isArchived)); // Active students
        setArchivedStudents(studentList.filter((student) => student.isArchived)); // Archived students
      } else {
        setStudents([]);
        setArchivedStudents([]);
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
      studentId: paddedId,
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
    update(studentRef, updatedStudent);
    setShowEditDrawer(false);
    setShowDetails(false);
  };

  // Archive functionality
  const handleArchiveToggle = (student) => {
    if (!student?.id) return;
    const studentRef = ref(db, `students/${student.id}`);
    update(studentRef, { isArchived: true }).then(() => {
      setShowDetails(false);
    });
  };

  const handleUnarchiveToggle = (studentId) => {
    const studentRef = ref(db, `students/${studentId}`);
    update(studentRef, { isArchived: false });
  };

  const handleDeleteStudent = (studentId) => {
    if (!studentId) return;
    const studentRef = ref(db, `students/${studentId}`);
    remove(studentRef)
      .then(() => {
        // Optionally, you can add notification or feedback here.
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  const toggleView = () => {
    setIsArchiveView(!isArchiveView);
  };

  return (
    <div className="student-list-container d-flex flex-grow-1">
      <div className="student-list-content flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <h2 className="student-title">Students</h2>
            <span className="student-count">
              {isArchiveView ? archivedStudents.length : students.length}
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <input className="search-input" placeholder="Search Here" />
            <div className="d-flex align-items-center gap-3">
              <button className="icon-btn" onClick={toggleDrawer}>
                <FaCommentDots />
              </button>
              <button className="icon-btn" onClick={toggleDrawer}>
                <FaBell />
              </button>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <select className="year-dropdown">
            <option>Year</option>
          </select>
          <div className="d-flex align-items-center gap-2">
            <button className="archive-btn" onClick={toggleView}>
              Archive
            </button>
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
              <th>Year &amp; Section</th>
              {isArchiveView && <th></th>}
            </tr>
          </thead>
          <tbody>
            {(isArchiveView ? archivedStudents : students).map((student, i) => (
              <tr
                key={i}
                onClick={() => handleRowClick(student)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  {student.image ? (
                    <img
                      src={student.image}
                      alt="Student Profile"
                      className="student-photo"
                    />
                  ) : (
                    <div className="student-photo" />
                  )}
                </td>
                <td>{student.studentId || "0001"}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{`${student.year || ""} - ${student.section || ""}`}</td>
                {isArchiveView && (
                  <td className="archive-actions">
                    <button
                      className="icon-btn unarchive-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnarchiveToggle(student.id);
                      }}
                      title="Unarchive"
                    >
                      <FaUndo />
                    </button>
                    <button
                      className="icon-btn delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteStudent(student.id);
                      }}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Student Drawer */}
      <AddStudentForm
        isOpen={isDrawerOpen}
        onClose={toggleDrawer}
        onSubmit={handleAddStudent}
      />

      {/* Student Details Drawer */}
      <StudentDetailsDrawer
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        student={selectedStudent}
        onEdit={handleEditStudent}
        onArchive={handleArchiveToggle}
      />

      {/* Edit Student Drawer */}
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
