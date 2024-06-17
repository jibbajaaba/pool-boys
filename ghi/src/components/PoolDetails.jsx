import { useGetAllAmenitiesQuery, useGetAllReservationsByPoolIdQuery, useGetPoolDetailsQuery } from '../app/apiSlice';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const PoolDetails = () => {
    const params = useParams()
    const { data: pool, isLoading, error } = useGetPoolDetailsQuery(params.pool_id)
    const { data: reservations, isLoading: resLoading, error: resError } = useGetAllReservationsByPoolIdQuery(params.pool_id)
    const { data: allAmenities, isLoading: amLoading, error: amError } = useGetAllAmenitiesQuery()
    console.log("CONTENT:", allAmenities)
    const poolAmenities = allAmenities?.filter(amenity => pool?.amenities_ids.includes(amenity.id));
    // console.log("CONTENT:", allAmenities)

    if (isLoading, resLoading)
        return (<p className="text-center py-10">
            {' '}Loading pools...</p>
        )

    if (error)
        return (<p className="text-center py-10 text-red-500">
        {' '}Error Loading Pools: {error.message}</p>
        )

    if (resLoading)
        return (<p className="text-center py-10">
            {' '}Loading reservations...</p>
        )

    if (resError)
        return (<p className="text-center py-10 text-green-700">
            {' '}Error Loading Reservations: {error.message}</p>
        )

    if (amLoading)
        return (<p className="text-center py-10">
            {' '}Loading amenities...</p>
        )

    if (amError)
        return (<p className="text-center py-10 text-green-700">
            {' '}Error Loading Amenities: {error.message}</p>
        )

    return (
        <div className="pool-detail-container">
            <img src={pool?.picture_url} className="w-full max-w-3xl mb-5" />
            <div className="pool-details">
                <h2>{pool?.address}</h2>
                <p>{pool?.description}</p>
                <p>Hourly Rate: ${pool?.hourly_rate}</p>
                <p>Max Guests: {pool?.number_guests}</p>
                <h3>Amenities:</h3>
                <ul>
                    {poolAmenities.map(amenity => (
                        <li key={amenity.id}>{amenity.name}</li>
                    ))}
                </ul>
            </div>

            <div className="reservations">
                <h3>Reservations:</h3>
                {reservations && reservations.length > 0 ? (
                    <ul>
                        {reservations.map(reservation => (
                            <li key={reservation.id}>
                                {new Date(reservation.start_time).toLocaleString()} - {new Date(reservation.end_time).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reservations yet.</p>
                )}
            </div>
        </div>
    )
}

export default PoolDetails
