import React, { useState } from 'react';
import { useGetAllAmenitiesQuery, useCreatePoolMutation } from '../app/apiSlice';
import { useNavigate } from 'react-router-dom';

const CreatePoolForm = () => {
  const { data: amenities, isLoading: isLoadingAmenities } = useGetAllAmenitiesQuery();
  const [createPool] = useCreatePoolMutation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    picture_url: '',
    address: '',
    description: '',
    hourly_rate: '',
    number_guests: '',
    amenities_ids: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAmenitiesChange = (e) => {
    const { value, checked } = e.target;
    const amenities_ids = formData.amenities_ids;
    if (checked) {
      amenities_ids.push(parseInt(value));
    } else {
      const index = amenities_ids.indexOf(parseInt(value));
      if (index > -1) {
        amenities_ids.splice(index, 1);
      }
    }
    setFormData({
      ...formData,
      amenities_ids
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdPool = await createPool(formData).unwrap();
      alert('Pool created successfully!');
      navigate(`/pools/details/${createdPool.id}`);
    } catch (err) {
      console.error('Failed to create pool:', err);
      alert('Failed to create pool');
    }
  };

  if (isLoadingAmenities) {
    return <div>Loading amenities...</div>;
  }

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
          <form
              onSubmit={handleSubmit}
              className="size-full mx-40 p-6 bg-white shadow-md rounded mt-32"
          >
              <div className="mb-4">
                  <label
                      htmlFor="picture_url"
                      className="block text-sm font-medium text-gray-700"
                  >
                      Picture URL:
                  </label>
                  <input
                      type="text"
                      name="picture_url"
                      id="picture_url"
                      value={formData.picture_url}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
              </div>
              <div className="mb-4">
                  <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700"
                  >
                      City & State:
                  </label>
                  <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
              </div>
              <div className="mb-4">
                  <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                  >
                      Description & Address:
                  </label>
                  <textarea
                      rows={4}
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
              </div>
              <div className="mb-4">
                  <label
                      htmlFor="hourly_rate"
                      className="block text-sm font-medium text-gray-700"
                  >
                      Hourly Rate:
                  </label>
                  <input
                      type="number"
                      name="hourly_rate"
                      id="hourly_rate"
                      min={1}
                      value={formData.hourly_rate}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
              </div>
              <div className="mb-4">
                  <label
                      htmlFor="number_guests"
                      className="block text-sm font-medium text-gray-700"
                  >
                      Number of Guests:
                  </label>
                  <input
                      type="number"
                      name="number_guests"
                      id="number_guests"
                      min={1}
                      value={formData.number_guests}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  />
              </div>
              <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                      Amenities:
                  </label>
                  {amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center mb-2">
                          <input
                              type="checkbox"
                              name="amenities_ids"
                              value={amenity.id}
                              checked={formData.amenities_ids.includes(
                                  amenity.id
                              )}
                              onChange={handleAmenitiesChange}
                              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                          <span className="ml-2 text-gray-700">
                              {amenity.name}
                          </span>
                      </div>
                  ))}
              </div>
              <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md shadow hover:bg-hippie focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300"
              >
                  Create Pool
              </button>
          </form>
      </div>
  )
};

export default CreatePoolForm;
