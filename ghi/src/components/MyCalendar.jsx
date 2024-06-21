import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({ reservations, onReserve }) => {
  const [value, setValue] = useState([new Date(), new Date()]);

  const isDateInRange = (date, range) => {
    return date >= new Date(range.start_time) && date <= new Date(range.end_time);
  };

  const isDateRangeOverlapping = (range1, range2) => {
    return isDateInRange(new Date(range1[0]), range2) || isDateInRange(new Date(range1[1]), range2) ||
           isDateInRange(new Date(range2.start_time), { start_time: new Date(range1[0]), end_time: new Date(range1[1]) }) || isDateInRange(new Date(range2.end_time), { start_time: new Date(range1[0]), end_time: new Date(range1[1]) });
  };

  const handleReserve = () => {
    const newReservation = { start_time: value[0], end_time: value[1] };

    const overlapping = reservations.some(reservation =>
      isDateRangeOverlapping(value, reservation)
    );

    if (overlapping) {
      alert('The selected date range overlaps with an existing reservation.');
    } else {
      onReserve(newReservation);
      alert('Reservation created successfully!');
    }
  };

  const isReserved = (date) => {
    return reservations.some(reservation =>
      isDateInRange(date, reservation)
    );
  };

  return (
    <div className="calendar-container">
      <Calendar
        selectRange
        onChange={setValue}
        value={value}
        tileClassName={({ date, view }) =>
          view === 'month' && isReserved(date) ? 'reserved' : null
        }
      />
      <button onClick={handleReserve} className="reserve-button">
        Reserve
      </button>
    </div>
  );
};

export default MyCalendar;
