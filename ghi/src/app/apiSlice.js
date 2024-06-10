import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const PoolBoysApi = createApi({
    reducerPath: 'PoolBoysApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000',
    }),
    endpoints: (builder) => ({
        getAllPools: builder.query({
            query: () => ({
                url: '/api/pools',
            }),
        }),
    }),
})

export const {
    useGetAllPoolsQuery
} = PoolBoysApi;
