import { useGetAllAmenitiesQuery, useGetAllReservationsByPoolIdQuery, useGetPoolDetailsQuery } from '../app/apiSlice';
import { useParams } from 'react-router-dom';
import '../App.css';

const PoolDetails = () => {
  const params = useParams();
  const { data: pool, isLoading, error } = useGetPoolDetailsQuery(params.pool_id);
  const { data: reservations, isLoading: resLoading, error: resError } = useGetAllReservationsByPoolIdQuery(params.pool_id);
  const { data: allAmenities, isLoading: amLoading, error: amError } = useGetAllAmenitiesQuery();

  if (reservations === null) {
    return "No Reservations made";
  }

  const poolAmenities = allAmenities?.filter(amenity => pool?.amenities_ids.includes(amenity.id));

  if (isLoading) return <p className="text-center py-10">Loading pools...</p>;
  if (error) return <p className="text-center py-10 text-red-500">Error Loading Pools: {error.message}</p>;
  if (resLoading) return <p className="text-center py-10">Loading reservations...</p>;
  if (amLoading) return <p className="text-center py-10">Loading amenities...</p>;
  if (amError) return <p className="text-center py-10 text-green-700">Error Loading Amenities: {error.message}</p>;

  return (
    <div className="pt-28 bg-lagoon min-h-screen p-6 flex items-center justify-center mx-auto my-auto">
      <div className="max-w-5xl bg-white p-6 rounded-lg shadow-md w-full">
        <div className="image-container mb-6">
          <img src={pool?.picture_url} alt="Pool" />
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
                  </tr>
                </thead>
                <tbody>
                  {reservations.map(reservation => (
                    <tr key={reservation.id}>
                      <td className="px-4 py-2 border-b">{new Date(reservation.start_time).toLocaleString()}</td>
                      <td className="px-4 py-2 border-b">{new Date(reservation.end_time).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-700">No reservations yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolDetails;
