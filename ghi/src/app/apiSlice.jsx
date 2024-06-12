import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const PoolBoysApi = createApi({
    reducerPath: 'PoolBoysApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: 'include',
    }),
    tagTypes: [
        'User',
        'Pool',
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
            providesTags: ['User']
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
            query: (pool_id) => ({
                url: `/api/pools/${pool_id}`,
                method: 'PUT'
            }),
            invalidatesTags: ['Pools']
        }),
        getAllReservationsByPoolId: builder.query({
            query: (pool_id) => ({
                url: `/api/pools/${pool_id}/reservations`,
            }),
            providesTags: [{type: 'Reservations', pool_id: 'LIST'}]
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
    })
})

export const {
    useGetAllAmenitiesQuery,
    useGetAmenityQuery,
    useGetAllReservationsByPoolIdQuery,
    useGetUserQuery,
    useSignoutUserMutation,
    useSigninUserMutation,
    useSignupUserMutation,
    useCreatePoolMutation,
    useGetAllPoolsQuery,
    useGetPoolDetailsQuery,
    useDeletePoolMutation,
    useUpdatePoolMutation
} = PoolBoysApi
