// import React, { useState, useEffect } from 'react';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

// const MyCalendar = ({ reservations, onReserve }) => {
//   const [value, setValue] = useState([new Date(), new Date()]);

//   const isDateInRange = (date, range) => {
//     return date >= new Date(range.start_time) && date <= new Date(range.end_time);
//   };

//   const isDateRangeOverlapping = (range1, range2) => {
//     return isDateInRange(new Date(range1[0]), range2) || isDateInRange(new Date(range1[1]), range2) ||
//           isDateInRange(new Date(range2.start_time), { start_time: new Date(range1[0]), end_time: new Date(range1[1]) }) || isDateInRange(new Date(range2.end_time), { start_time: new Date(range1[0]), end_time: new Date(range1[1]) });
//   };

//   const handleReserve = () => {
//     const newReservation = { start_time: value[0], end_time: value[1] };

//     const overlapping = reservations.some(reservation =>
//       isDateRangeOverlapping(value, reservation)
//     );

//     if (overlapping) {
//       alert('The selected date range overlaps with an existing reservation.');
//     } else {
//       onReserve(newReservation);
//       alert('Reservation created successfully!');
//     }
//   };

//   const isReserved = (date) => {
//     return reservations.some(reservation =>
//       isDateInRange(date, reservation)
//     );
//   };

//   return (
//     <div className="calendar-container">
//       <Calendar
//         selectRange
//         onChange={setValue}
//         value={value}
//         tileClassName={({ date, view }) =>
//           view === 'month' && isReserved(date) ? 'reserved' : null
//         }
//       />
//       <button onClick={handleReserve} className="reserve-button">
//         Reserve
//       </button>
//     </div>
//   );
// };

// export default MyCalendar;



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
      isDateTimeInRange(new Date(start), reservation) || 
      isDateTimeInRange(new Date(end), reservation) ||
      (new Date(start) < new Date(reservation.start_time) && new Date(end) > new Date(reservation.end_time))
    );
  };

  const handleReserve = () => {
    const newReservation = { start_time: startDateTime.toISOString(), end_time: endDateTime.toISOString() };

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
