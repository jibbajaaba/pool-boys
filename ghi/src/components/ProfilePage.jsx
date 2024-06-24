import React from 'react';
import { useGetAllPoolsbyUsernameQuery, useDeletePoolMutation, useGetUserQuery } from '../app/apiSlice';
import { useNavigate, Link } from 'react-router-dom';
import "../App.css";

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
    <div
      className="min-h-screen w-full flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/surface-green-swimming-pool-texture-background_55716-2249.jpg?w=1380')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      <div className="pt-28 text-wrap bg-lagoon min-h-screen p-6 size-full mx-40 my-auto">
        {user && (
          <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold text-copper mb-6">
              Welcome, {user.first_name}!
            </h1>
            <div className="border text-wrap rounded-lg shadow-md p-6 bg-primary box-border w-full">
              <h2 className="text-2xl text-wrap font-bold text-white mb-4">
                Account Details
              </h2>
              <p className="text-white text-wrap font-bold mb-2">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-white text-wrap mb-2">
                {user.email}
              </p>
              <p className="text-white text-wrap mb-2">
                {user.username}
              </p>
              <p className="text-white text-wrap">
                {user.phone_number}
              </p>
            </div>
          </div>
        )}

        <h2 className="text-2xl font-bold text-copper mb-4">
          Pool List
        </h2>
        <div className="max-w-5xl mx-auto mb-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pools && pools.length > 0 ? (
              pools.map((pool) => (
                <li
                  key={pool.id}
                  className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
                >
                  <Link to={`/pools/details/${pool.id}`}>
                    <img
                      src={pool.picture_url}
                      alt="Pool"
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <div className="text-lg font-semibold text-primary mb-2">
                      {pool.address}
                    </div>
                    <div className="text-gray-600 mb-4">
                      Hourly Rate: ${pool.hourly_rate}
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() =>
                          handleUpdate(pool.id)
                        }
                        className="px-4 py-2 bg-primary text-white font-semibold rounded-md shadow hover:bg-hippie focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300"
                      >
                        Update
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(pool.id)
                        }
                        className="px-4 py-2 bg-copper text-white font-semibold rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
                      >
                        Delete
                      </button>
                    </div>
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
      </div>
    </div>
  )
};

export default ProfilePage;
