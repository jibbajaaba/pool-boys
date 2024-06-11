import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
        createPool: builder.mutation({
            query: (body) => ({
                url: 'api/pools',
                method: 'POST',
                body
            }),
            providesTags: ['Pool']
        }),
        getPoolDetails: builder.query({
            query: (id) => ({
                url: `api/pools/${id}`
            }),
            providesTags: ['Pool']
        }),
        deletePool: builder.mutation({
            query: () => ({
                url: `/api/pools/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Pool']
        }),
    }),
});

export const {
    useGetAllPoolsQuery,
    useGetUserQuery,
    useSignoutUserMutation,
    useSigninUserMutation,
    useSignupUserMutation,
    useCreatePoolMutation,
    useGetPoolDetailsQuery,
    useDeletePoolMutation,
} = PoolBoysApi;






// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const PoolBoysApi = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
//     tagTypes: ['Reservation', 'Pool', 'Amenity', 'User'],
//     endpoints: (builder) => ({

//         signin: builder.mutation({
//             query: (credentials) => ({
//                 url: '/signin',
//                 method: 'POST',
//                 body: credentials,
//             }),
//         }),
        // signupUser: builder.mutation({
        //     query: (userDetails) => ({
        //         url: '/signup',
        //         method: 'POST',
        //         body: userDetails,
        //     }),
        //     invalidatesTags: ['User'],
//         }),
//         authenticateUser: builder.query({
//             query: () => '/authenticate',
//             providesTags: ['User'],
//         }),
//         signoutUser: builder.mutation({
//             query: () => ({
//                 url: '/signout',
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['User'],
//         }),


//         createReservation: builder.mutation({
//             query: (newReservation) => ({
//                 url: '/api/reservations',
//                 method: 'POST',
//                 body: newReservation,
//             }),
//             invalidatesTags: ['Reservation'],
//         }),
//         getAllReservations: builder.query({
//             query: () => '/api/reservations',
//             providesTags: ['Reservation'],
//         }),
//         getReservationById: builder.query({
//             query: (id) => `/api/reservations/${id}`,
//             providesTags: ['Reservation'],
//         }),
//         deleteReservation: builder.mutation({
//             query: (id) => ({
//                 url: `/api/reservations/${id}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['Reservation'],
//         }),


//         createPool: builder.mutation({
//             query: (newPool) => ({
//                 url: '/api/pools',
//                 method: 'POST',
//                 body: newPool,
//             }),
//             invalidatesTags: ['Pool'],
//         }),
//         getAllPools: builder.query({
//             query: () => '/api/pools',
//             providesTags: ['Pool'],
//         }),
//         getPoolDetails: builder.query({
//             query: (poolId) => `/api/pools/${poolId}`,
//             providesTags: ['Pool'],
//         }),
//         updatePool: builder.mutation({
//             query: ({ poolId, data }) => ({
//                 url: `/api/pools/${poolId}`,
//                 method: 'PUT',
//                 body: data,
//             }),
//             invalidatesTags: ['Pool'],
//         }),
//         deletePool: builder.mutation({
//             query: (poolId) => ({
//                 url: `/api/pools/${poolId}`,
//                 method: 'DELETE',
//             }),
//             invalidatesTags: ['Pool'],
//         }),


//         getAllAmenities: builder.query({
//             query: () => '/api/amenities',
//             providesTags: ['Amenity'],
//         }),
//         getAmenityById: builder.query({
//             query: (id) => `/api/amenities/${id}`,
//             providesTags: ['Amenity'],
//         }),
//     }),
// });

// export const {
//     useSigninMutation,
//     useSignupUserMutation,
//     useAuthenticateUserQuery,
//     useSignoutUserMutation,
//     useCreateReservationMutation,
//     useGetAllReservationsQuery,
//     useGetReservationByIdQuery,
//     useDeleteReservationMutation,
//     useCreatePoolMutation,
//     useGetAllPoolsQuery,
//     useGetPoolDetailsQuery,
//     useUpdatePoolMutation,
//     useDeletePoolMutation,
//     useGetAllAmenitiesQuery,
//     useGetAmenityByIdQuery,
// } = PoolBoysApi;
