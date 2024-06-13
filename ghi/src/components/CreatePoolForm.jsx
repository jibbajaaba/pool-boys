import React, { useState } from 'react';
import { useGetAllAmenitiesQuery, useCreatePoolMutation } from '../app/apiSlice';

const CreatePoolForm = () => {
    const { data: amenities, isLoading: isLoadingAmenities } = useGetAllAmenitiesQuery();
    const [createPool] = useCreatePoolMutation();
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
            await createPool(formData).unwrap();
            alert('Pool created successfully!');
        } catch (err) {
            console.error('Failed to create pool:', err);
            alert('Failed to create pool');
        }
    };

    if (isLoadingAmenities) {
        return <div>Loading amenities...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Picture URL:</label>
                <input
                    type="text"
                    name="picture_url"
                    value={formData.picture_url}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Hourly Rate:</label>
                <input
                    type="number"
                    name="hourly_rate"
                    value={formData.hourly_rate}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Number of Guests:</label>
                <input
                    type="number"
                    name="number_guests"
                    value={formData.number_guests}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Amenities:</label>
                {amenities.map((amenity) => (
                    <div key={amenity.id}>
                        <input
                            type="checkbox"
                            name="amenities_ids"
                            value={amenity.id}
                            checked={formData.amenities_ids.includes(amenity.id)}
                            onChange={handleAmenitiesChange}
                        />
                        {amenity.name}
                    </div>
                ))}
            </div>
            <button type="submit">Create Pool</button>
        </form>
    );
};

export default CreatePoolForm;
