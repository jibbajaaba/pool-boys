import { configureStore } from '@reduxjs/toolkit'
import { PoolBoysApi } from './apiSlice'

export const store = configureStore({
    reducer: {
        [PoolBoysApi.reducerPath]: PoolBoysApi.reducer,
    },
    middleware: (getDefualtMiddleware) =>
        getDefualtMiddleware().concat(PoolBoysApi.middleware),
})
