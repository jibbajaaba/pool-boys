import React, { useState } from 'react';
import Calendar from 'react-calendar';
import DateTimePicker from 'react-datetime-picker';
import 'react-calendar/dist/Calendar.css';
import 'react-datetime-picker/dist/DateTimePicker.css';

const MyCalendar = ({ reservations, onReserve }) => {
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [endDateTime, setEndDateTime] = useState(new Date());

  const isDateTimeInRange = (dateTime, range) => {
    return dateTime >= new Date(range.start_time) && dateTime <= new Date(range.end_time);
  };

  const isDateTimeRangeOverlapping = (start, end) => {
    return reservations.some(reservation => 
      isDateTimeInRange(start, reservation) || 
      isDateTimeInRange(end, reservation) ||
      (start < new Date(reservation.start_time) && end > new Date(reservation.end_time))
    );
  };

  const handleReserve = () => {
    const newReservation = { start_time: startDateTime, end_time: endDateTime };

    if (isDateTimeRangeOverlapping(startDateTime, endDateTime)) {
      alert('The selected date range overlaps with an existing reservation.');
    } else {
      onReserve(newReservation);
      alert('Reservation created successfully!');
    }
  };

  const isReserved = (dateTime) => {
    return reservations.some(reservation =>
      isDateTimeInRange(dateTime, reservation)
    );
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={(date) => {
          setStartDateTime(new Date(date));
          setEndDateTime(new Date(date));
        }}
        value={startDateTime}
        tileClassName={({ date, view }) =>
          view === 'month' && isReserved(date) ? 'reserved' : null
        }
      />
      <div className="time-picker-container">
        <label>
          Start Time:
          <DateTimePicker
            onChange={setStartDateTime}
            value={startDateTime}
            disableClock={true}
            minDate={new Date()}
          />
        </label>
        <label>
          End Time:
          <DateTimePicker
            onChange={setEndDateTime}
            value={endDateTime}
            disableClock={true}
            minDate={startDateTime}
          />
        </label>
      </div>
      <button onClick={handleReserve} className="reserve-button">
        Reserve
      </button>
    </div>
  );
};

export default MyCalendar;


