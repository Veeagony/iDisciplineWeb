import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import DatePicker from 'react-datepicker';
import { db } from '../../firebase/firebaseConfig';
import { ref, onValue } from 'firebase/database';
import AddAppointments from './AddAppointments';
import { FaBell, FaCommentDots } from "react-icons/fa";
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import './Appointments.css';

const Appointments = () => {
  const [date, setDate] = useState(new Date());
  const [appointments, setAppointments] = useState([]);
  const [violations, setViolations] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [markedDates, setMarkedDates] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All'); // State for the active category
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  // Fetch appointments from Firebase
  useEffect(() => {
    const appointmentsRef = ref(db, 'appointments');
    const unsubscribe = onValue(appointmentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const appointmentsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setAppointments(appointmentsArray);
        // Update marked dates using Set to avoid duplicates
        const uniqueDates = [...new Set(
          appointmentsArray.map(appt => new Date(appt.datetime).toDateString())
        )];
        setMarkedDates(uniqueDates);
      } else {
        setAppointments([]);
        setMarkedDates([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch violations from Firebase
  useEffect(() => {
    const violationsRef = ref(db, 'violations');
    const unsubscribe = onValue(violationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const violationsArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }));
        setViolations(violationsArray);
      }
    });
    return () => unsubscribe();
  }, []);

  // Filter appointments based on the active category
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(appt => appt.meetingType === activeCategory);
      setFilteredAppointments(filtered);
    }
  }, [appointments, activeCategory]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toDateString();
      return markedDates.includes(dateString) ? 'has-appointment' : null;
    }
    return null;
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  return (
    <div className="appointments-page px-4 py-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <h4 className="appointments-title">Appointments</h4>
          <span className="appointments-count">{filteredAppointments.length}</span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button className="icon-btn">
                      <FaCommentDots size={20} />
                    </button>
                    <button className="icon-btn">
                      <FaBell size={20} />
                    </button>
        </div>
      </div>

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
            className={`btn ${activeCategory === category ? "filter-active" : "btn-outline-primary"} fw-semibold`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Add Button */}
      <div className="d-flex mt-2">
        <button
          className="add-appointment-btn"
          onClick={() => setDrawerOpen(true)}
        >
          Add an Appointment
        </button>
      </div>

      {/* Calendar */}
      <div className="calendar-container">
        <Calendar
          onChange={handleDateChange}
          value={date}
          minDate={new Date()}
          tileClassName={tileClassName}
        />
      </div>

      {/* Appointments Table */}
      <div className="appointments-table">
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Student ID</th>
              <th>Full Name</th>
              <th>Case</th>
              <th>Meeting Type</th>
              <th>Date Sent</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.status}</td>
                <td>{appointment.studentId}</td>
                <td>{appointment.studentName}</td>
                <td>{appointment.caseNo}</td>
                <td>{appointment.meetingType}</td>
                <td>{new Date(appointment.datetime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDrawerOpen && (
        <AddAppointments
          closeDrawer={() => setDrawerOpen(false)}
          violations={violations}
        />
      )}
    </div>
  );
};

export default Appointments;