import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import default styles
import './Appointments.css'; // Import your custom styles

const Appointments = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([
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
  {/* Header Section (Title + Count + Icons) */}
  <div className="d-flex justify-content-between align-items-center mb-3">
    <div className="d-flex align-items-center">
      <h4 className="appointments-title">Appointments Overview</h4>
      <span className="appointments-count">{appointments.length}</span>
    </div>
  </div>

  {/* Filter Bar Styled Like Violations */}
  <div className="appointments-filter-bar d-flex align-items-center gap-3 mb-3">
    <input
      type="text"
      className="form-control border-start-0"
      placeholder="Search Here"
    />

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

    <button className="add-appointment-btn ms-auto">Add an Appointment</button>
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
