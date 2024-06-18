import React from 'react';
import { useGetAllPoolsbyUsernameQuery, useDeletePoolMutation, useGetUserQuery } from '../app/apiSlice';
import { useNavigate, Link } from 'react-router-dom';


const ProfilePage = () => {
    const { data: user, isLoading: userLoading } = useGetUserQuery();
    const { data: pools, isLoading, error } = useGetAllPoolsbyUsernameQuery();
    const [deletePool] = useDeletePoolMutation();
    const navigate = useNavigate();

    if (userLoading) return <div className="text-center py-10">Loading user...</div>;
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
            {user && (
                <div className="flex flex-col items-center mb-8 profile-details">
                    <h1 className="text-3xl font-bold mb-6 text-copper">
                        {' '}
                        Welcome {user.first_name}!{' '}
                    </h1>
                    <div className="flex flex-col items-center">
                        <div className="border rounded-lg shadow-md p-4 bg-primary box-border inline-block">
                            <h2 className="text-2xl font-bold text-white">
                                Account Details
                            </h2>
                            <p className="text-white font-bold">
                                {user.first_name} {user.last_name}
                            </p>
                            <p className="text-white">{user.email}</p>
                            <p className="text-white">{user.username}</p>
                            <p className="text-white">{user.phone_number}</p>
                        </div>
                    </div>
                </div>
            )}
            <h2 className="text-2xl font-bold mb-4 text-copper"> My Pools</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pools && pools.length > 0 ? (
                    pools.map((pool) => (
                        <li
                            key={pool.id}
                            className="border rounded-lg shadow-md p-4 bg-white"
                        >
                            <Link to={`/pools/details/${pool.id}`}>
                                <img
                                    src={pool.picture_url}
                                    alt="Pool"
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            </Link>
                            <div className="mt-2">
                                <div className="text-lg font-semibold text-primary">
                                    {pool.address}
                                </div>
                                <div className="text-primary">
                                    Hourly Rate: ${pool.hourly_rate}
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between">
                                <button
                                    onClick={() => handleUpdate(pool.id)}
                                    className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow hover:bg-hippie focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(pool.id)}
                                    className="px-4 py-2 bg-copper text-white font-semibold rounded-md shadow hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500">
                        No pools available.
                    </div>
                )}
            </ul>
        </div>
    )
};

export default ProfilePage;
