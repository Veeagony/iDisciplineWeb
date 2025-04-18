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
    <div className="appointments-container">
      <div className="header">
        <h3>Appointments Overview</h3>
        <div className="filters">
          <input type="text" placeholder="Search Here" />
          <select>
            <option>Upcoming</option>
            <option>All</option>
            <option>PTC</option>
            <option>Counseling</option>
            <option>Archive</option>
          </select>
          <button>Add an Appointment</button>
        </div>
      </div>
      
      <div className="calendar-container">
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
