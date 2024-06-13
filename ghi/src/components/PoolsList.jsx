import React from 'react';
import { useGetAllPoolsQuery } from '../app/apiSlice';

const PoolsList = () => {
    const { data: pools, isLoading, error } = useGetAllPoolsQuery();

    if (isLoading) return <div className="text-center py-10">Loading pools...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error loading pools: {error.message}</div>;

    return (
        <div className="p-4 mt-24">
            <h1 className="text-2xl font-bold mb-4 text-primary">Pool List</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pools.map(pool => (
                    <li key={pool.id} className="border rounded-lg shadow-md p-4 bg-white">
                        <img
                            src={pool.picture_url}
                            alt="Pool"
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="mt-2">
                            <div className="text-lg font-semibold text-gray-700">{pool.address}</div>
                            <div className="text-gray-600">Hourly Rate: ${pool.hourly_rate}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PoolsList;
