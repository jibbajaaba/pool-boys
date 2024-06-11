import React from 'react';
import { useGetAllPoolsQuery } from '../app/apiSlice';

const PoolsList = () => {
    const { data: pools, isLoading, error } = useGetAllPoolsQuery();
    
    if (isLoading) return <div>Loading pools...</div>;
    if (error) return <div>Error loading pools: {error.message}</div>;

    return (
        <div className='row mt-3'>
            {pools && pools.length > 0 ? (
                pools.map((pool) => (
                    <div key={pool.id} className="pool">
                        <h3>{pool.name}</h3>
                        <p>{pool.picture_url}</p>
                        <p>{pool.address}</p>
                        <p>{pool.description}</p>
                        <p>{pool.hourly_rate}</p>
                        <p>{pool.number_guests}</p>
                    </div>
                ))
            ) : (
                <div>No pools available.</div>
            )}
        </div>
    );
};

export default PoolsList;

