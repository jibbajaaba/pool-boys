import React from 'react';
import { useGetAllPoolsQuery, useDeletePoolMutation } from '../app/apiSlice';
import { useNavigate, Link } from 'react-router-dom';

const ProfilePage = () => {
    const { data: pools, isLoading, error } = useGetAllPoolsQuery();
    const [deletePool] = useDeletePoolMutation();
    const navigate = useNavigate();

    if (isLoading) return <div className="text-center py-10">Loading pools...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error loading pools: {error.message}</div>;

    const handleDelete = async (poolId) => {
        try {
            await deletePool(poolId).unwrap();
            alert('Pool deleted successfully!');
        } catch (err) {
            console.error('Failed to delete pool:', err);
            alert('Failed to delete pool');
        }
    };

    const handleUpdate = (poolId) => {
        navigate(`/pools/update/${poolId}`);
    };

    return (
        <div className="p-4 mt-24">
            <h1 className="text-2xl font-bold mb-4 text-primary">Pool List</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pools && pools.length > 0 ? (
                    pools.map(pool => (
                        <li key={pool.id} className="border rounded-lg shadow-md p-4 bg-white">
                            <Link to={`/pools/details/${pool.id}`}>
                            <img
                                src={pool.picture_url}
                                alt="Pool"
                                className="w-full h-48 object-cover rounded-t-lg"
                            />
                            </Link>
                            <div className="mt-2">
                                <div className="text-lg font-semibold text-gray-700">{pool.address}</div>
                                <div className="text-gray-600">Hourly Rate: ${pool.hourly_rate}</div>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleUpdate(pool.id)}
                                    className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow hover:bg-hippie focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300"
                                >
                                    Update Pool
                                </button>
                                <button
                                    onClick={() => handleDelete(pool.id)}
                                    className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
                                >
                                    Delete Pool
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">No pools available.</div>
                )}
            </ul>
        </div>
    );
};

export default ProfilePage;
