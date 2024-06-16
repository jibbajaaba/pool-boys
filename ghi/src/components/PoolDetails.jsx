import { useGetPoolDetailsQuery } from '../app/apiSlice';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const PoolDetails = () => {
    const params = useParams()
    const { data: pools, isLoading, error } = useGetPoolDetailsQuery(params.pool_id)


    if (isLoading)
        return (
            <div className="text-center py-10">
                {' '}
                Loading pools...
            </div>
        )

    if (error)
        return (
            <div className="text-center py-10 text-red-500">
                {' '}
                Error Loading Pools: {error.message}
            </div>
        )

    return (
        <div className="p-4 mt-24">
            <h1 className="text-2xl font-bold mb-4 text-primary">Pool Details</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <li
                    key={pools.id}
                    className="border rounded-lg shadow-md p-4 bg-white"
                >
                    <img
                        src={pools.picture_url}
                        alt="Pool"
                        className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="mt-2">
                        <div className="text-lg font-semibold text-gray-700">
                            {pools.address}
                        </div>
                        <div className="text-gray-600">
                            Hourly Rate: ${pools.hourly_rate}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default PoolDetails
