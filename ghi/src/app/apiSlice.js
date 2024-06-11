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
    }),
});

export const {
    useGetAllPoolsQuery
} = PoolBoysApi;