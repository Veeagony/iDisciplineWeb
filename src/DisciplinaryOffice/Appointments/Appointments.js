import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import './Appointments.css'; // Import your custom styles

const Appointments = () => {
  const [date, setDate] = useState(new Date());
  const [appointments] = useState([
    { id: 1, status: 'Settled', studentId: '00000', fullName: 'First Name Last Name', case: 'Case1', message: '---', dateSent: '2025-02-04' },
    { id: 2, status: 'Unsettled', studentId: '00001', fullName: 'First Name Last Name', case: 'Case2', message: '---', dateSent: '2025-02-05' },
    { id: 3, status: 'Settled', studentId: '00002', fullName: 'First Name Last Name', case: 'Case3', message: '---', dateSent: '2025-02-06' },
    { id: 4, status: 'Unsettled', studentId: '00003', fullName: 'First Name Last Name', case: 'Case4', message: '---', dateSent: '2025-02-07' },
  ]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    // Filter appointments based on the selected date
  };

  return (
    <div className="appointments-page px-4 py-4">
      {/* Header Row (Title + Badge + Icons) */}
<div className="d-flex justify-content-between align-items-center mb-3">
  <div className="d-flex align-items-center">
    <h4 className="appointments-title">Appointments</h4>
    <span className="appointments-count">4</span>
  </div>
  <div className="d-flex align-items-center gap-3">
    <button className="icon-btn">
      <i className="fas fa-comment-dots"></i>
    </button>
    <button className="icon-btn">
      <i className="fas fa-bell"></i>
    </button>
  </div>
</div>

  {/* Header Section (Title + Count + Icons) */}
  {/* Filter Bar */}
<div className="appointments-filter-bar d-flex align-items-center gap-3 mb-2">
  <div className="search-group">
    <i className="fas fa-search"></i>
    <input
      type="text"
      className="form-control border-start-0"
      placeholder="Search Here"
    />
  </div>

  <select className="dropdown">
    <option>Upcoming</option>
  </select>

  {["All", "PTC", "Counseling", "Archive"].map((category) => (
    <button
      key={category}
      className={`btn ${category === "All" ? "filter-active" : "btn-outline-primary"} fw-semibold`}
    >
      {category}
    </button>
  ))}
</div>

{/* Add Button */}
<div className="d-flex mt-2">
  <button className="add-appointment-btn">Add an Appointment</button>
</div>

      <div className="calendar-container">
        <div className="calendar-wrapper"></div>
        <Calendar
          onChange={handleDateChange}
          value={date}
          minDate={new Date()}
        />
      </div>

      <div className="appointments-table">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Student ID</th>
              <th>Full Name</th>
              <th>Case</th>
              <th>Message</th>
              <th>Date Sent</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.status}</td>
                <td>{appointment.studentId}</td>
                <td>{appointment.fullName}</td>
                <td>{appointment.case}</td>
                <td>{appointment.message}</td>
                <td>{appointment.dateSent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
