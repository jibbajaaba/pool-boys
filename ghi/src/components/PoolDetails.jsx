import React, { useState, useEffect } from 'react';
import { useGetAllAmenitiesQuery, useGetAllReservationsByPoolIdQuery, useGetPoolDetailsQuery, useDeleteReservationMutation, useCreateReservationMutation } from '../app/apiSlice';
import { useParams } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import '../App.css';

const PoolDetails = () => {
  const params = useParams();
  const { data: pool, isLoading, error } = useGetPoolDetailsQuery(params.pool_id);
  const { data: reservationsData, isLoading: resLoading, error: resError, refetch } = useGetAllReservationsByPoolIdQuery(params.pool_id);
  const { data: allAmenities, isLoading: amLoading, error: amError } = useGetAllAmenitiesQuery();
  const [deleteReservation] = useDeleteReservationMutation();
  const [createReservation] = useCreateReservationMutation();

  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({ start_time: new Date(), end_time: new Date() });

  useEffect(() => {
    if (reservationsData) {
      setReservations(reservationsData);
    }
  }, [reservationsData]);

  if (reservationsData === null) {
    return "No Reservations made";
  }

  if (reservations === null) {
    return "No Reservations made";
  }

  const poolAmenities = allAmenities?.filter(amenity => pool?.amenities_ids.includes(amenity.id));

  if (isLoading) return <p className="text-center py-10">Loading pools...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error Loading Pools: {error.message}</p>;
  if (resLoading) return <p className="text-center py-10">Loading reservations...</p>;
  if (amLoading) return <p className="text-center py-10">Loading amenities...</p>;
  if (amError) return <p className="text-center py-10 text-green-700">Error Loading Amenities: {amError.message}</p>;

  const handleDeleteReservation = async (reservationId) => {
    try {
      await deleteReservation(reservationId).unwrap();
      refetch();
      setReservations(prevReservations => prevReservations.filter(reservation => reservation.id !== reservationId));
      alert('Reservation deleted successfully!');
    } catch (err) {
      console.error('Failed to delete reservation:', err);
      alert('Failed to delete reservation');
    }
  };

  const handleReservationSubmit = async (e) => {
    e.preventDefault();

    const newStartTime = new Date(newReservation.start_time).getTime();
    const newEndTime = new Date(newReservation.end_time).getTime();

    const overlapping = reservations.some(reservation => {
      const resStartTime = new Date(reservation.start_time).getTime();
      const resEndTime = new Date(reservation.end_time).getTime();
      return (newStartTime < resEndTime && newEndTime > resStartTime);
    });

    if (overlapping) {
      alert('The selected time range overlaps with an existing reservation.');
    } else {
      try {
        await createReservation({ pool_id: params.pool_id, ...newReservation }).unwrap();
        refetch();
        alert('Reservation created successfully!');
        setNewReservation({ start_time: new Date(), end_time: new Date() });
      } catch (err) {
        console.error('Failed to create reservation:', err);
        alert('Failed to create reservation');
      }
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-photo/surface-green-swimming-pool-texture-background_55716-2249.jpg?w=1380')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        paddingTop: "6rem",
      }}
    >
      <div className="max-w-5xl bg-white p-6 rounded-lg shadow-md w-full">
        <div className="image-container mb-6">
          <img src={pool?.picture_url} alt="Pool" className="w-full h-64 object-cover rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="pool-details mb-6">
            <h2 className="text-3xl font-bold text-primary mb-4">{pool?.address}</h2>
            <p className="text-gray-700 mb-2"><span className="font-semibold">Description:</span> {pool?.description}</p>
            <p className="text-gray-700 mb-2"><span className="font-semibold">Hourly Rate:</span> ${pool?.hourly_rate}</p>
            <p className="text-gray-700 mb-2"><span className="font-semibold">Max Guests:</span> {pool?.number_guests}</p>
            <h3 className="text-2xl font-semibold text-primary mb-2">Amenities:</h3>
            <ul className="list-disc list-inside mb-6 text-gray-700">
              {poolAmenities.map(amenity => (
                <li key={amenity.id}>{amenity.name}</li>
              ))}
            </ul>
          </div>
          <div className="reservations">
            <h3 className="text-2xl font-semibold text-primary mb-4">Days Blocked from Renters:</h3>
            {reservations && reservations.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b">Start Time</th>
                    <th className="px-4 py-2 border-b">End Time</th>
                    <th className="px-4 py-2 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map(reservation => (
                    <tr key={reservation.id}>
                      <td className="px-4 py-2 border-b">{new Date(reservation.start_time).toLocaleString()}</td>
                      <td className="px-4 py-2 border-b">{new Date(reservation.end_time).toLocaleString()}</td>
                      <td className="px-4 py-2 border-b">
                        <button
                          onClick={() => handleDeleteReservation(reservation.id)}
                          className="px-4 py-2 bg-copper text-white font-semibold rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-700">No reservations yet.</p>
            )}
            <form onSubmit={handleReservationSubmit}>
              <div className="mb-4">
                <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">Start Time</label>
                <DateTimePicker
                  value={newReservation.start_time}
                  onChange={(date) => setNewReservation(prevState => ({ ...prevState, start_time: date }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">End Time</label>
                <DateTimePicker
                  value={newReservation.end_time}
                  onChange={(date) => setNewReservation(prevState => ({ ...prevState, end_time: date }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md shadow hover:bg-hippie focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300"
              >
                Reserve
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolDetails;
