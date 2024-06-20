import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const PoolBoysApi = createApi({
    reducerPath: 'PoolBoysApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: 'include',
    }),
    tagTypes: [
        'User',
        'Pools',
        'Reservation',
        'Amenity'
    ],
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => ({
                url: '/api/auth/authenticate'
            }),
            providesTags: ['User']
        }),
        signoutUser: builder.mutation({
            query: () => ({
                url: '/api/auth/signout',
                method: 'DELETE'
            }),
            invalidatesTags: ['User']
        }),
        signinUser: builder.mutation({
            query: (body) => ({
                url: 'api/auth/signin',
                method: 'POST',
                body
            }),
            invalidatesTags: ['User']
        }),
        signupUser: builder.mutation({
            query: (body) => ({
                url: 'api/auth/signup',
                method: 'POST',
                body
            }),
            invalidatesTags: ['User']
        }),
        getAllPools: builder.query({
            query: () => ({
                url:'/api/pools'
            }),
            providesTags: ['Pools']
        }),
        createPool: builder.mutation({
            query: (body) => ({
                url: 'api/pools',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Pools']
        }),
        getAllPoolsbyUsername: builder.query({
            query: () => ({
                url:'/api/pools/mine',
            }),
            providesTags: ['Pools']
        }),
        getPoolDetails: builder.query({
            query: (pool_id) => ({
                url: `api/pools/${pool_id}`
            }),
            providesTags: ['Pools']
        }),
        deletePool: builder.mutation({
            query: (pool_id) => ({
                url: `/api/pools/${pool_id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Pools']
        }),
        updatePool: builder.mutation({
            query: ({ pool_id, ...body }) => ({
                url: `/api/pools/${pool_id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Pools']
        }),
        getAllReservationsByPoolId: builder.query({
            query: (id) => ({
                url: `/api/pools/${id}/reservations`,
            }),
            providesTags: [{type: 'Reservations', id: 'LIST'}]
        }),
        // 
        createReservation: builder.mutation({
            query: (body) => ({
                url: '/api/reservations',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Reservations']
        }),
        getAllAmenities: builder.query({
            query: () => ({
                url: '/api/amenities'
            }),
            providesTags: [{type: 'Amenities', id: 'LIST'}]
        }),
        getAmenity: builder.query({
            query: (id) => ({
                url: `/api/amenities/${id}`
            }),
            providesTags: (_result, _error, arg) => [{type: 'Amenities', id: arg}],
        }),
        deleteReservation: builder.mutation({
            query: (reservationId) => ({
                url: `/api/reservations/${reservationId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Reservation']
        }),
    })
})

export const {
    useGetAllAmenitiesQuery,
    useGetAmenityQuery,
    useGetAllPoolsbyUsernameQuery,
    useGetAllReservationsByPoolIdQuery,
    useGetUserQuery,
    useSignoutUserMutation,
    useSigninUserMutation,
    useSignupUserMutation,
    useCreatePoolMutation,
    useGetAllPoolsQuery,
    useGetPoolDetailsQuery,
    useDeletePoolMutation,
    useUpdatePoolMutation,
    useCreateReservationMutation,
    useDeleteReservationMutation
} = PoolBoysApi
