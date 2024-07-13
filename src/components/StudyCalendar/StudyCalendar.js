import React from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './StudyCalendar.css';

const StudyCalendar = ({ value, onChange }) => { 
  return (
    <div className="study-calendar">
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default StudyCalendar;
