import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const PoolBoysApi = createApi({
    reducerPath: 'PoolBoysApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_HOST,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getAllPools: builder.query({
            query: () => '/api/pools',
        }),
        getUser: builder.query({
            query: () => ({
                url: '/api/auth/authenticate',
            }),
            providesTags: ['User'],
        }),
        signoutUser: builder.mutation({
            query: () => ({
                url: '/api/auth/signout',
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        }),
        signinUser: builder.mutation({
            query: (body) => ({
                url: 'api/auth/signin',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['User'],
        }),
        signupUser: builder.mutation({
            query: (body) => ({
                url: 'api/auth/signup',
                method: 'POST',
                body,
            }),
            providesTags: ['User'],
        }),
        createPool: builder.mutation({
            query: (body) => ({
                url: 'api/pools',
                method: 'POST',
                body,
            }),
            providesTags: ['Pool'],
        }),
        getPoolDetails: builder.query({
            query: (id) => ({
                url: `api/pools/${id}`,
            }),
            providesTags: ['Pool'],
        }),
        deletePool: builder.mutation({
            query: () => ({
                url: `/api/pools/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Pool'],
        }),
        getReservations: builder.query({
            query: () => ({
                url: '/api/reservations',
            }),
        }),
        createReservations: builder.mutation({
            query: (body) => ({
                url: '/api/reservations',
                method: 'POST',
                body,
            }),
            providesTags: ['Reservations'],
        }),
    }),
})

export const {
    useCreateReservationsMutation,
    useGetReservationsQuery,
    useGetAllPoolsQuery,
    useGetUserQuery,
    useSignoutUserMutation,
    useSigninUserMutation,
    useSignupUserMutation,
    useCreatePoolMutation,
    useGetPoolDetailsQuery,
    useDeletePoolMutation,
} = PoolBoysApi
