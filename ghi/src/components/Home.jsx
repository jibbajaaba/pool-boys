import { useGetUserQuery } from "../app/apiSlice";
import { useSignoutUserMutation } from "../app/apiSlice";
import { useCreateReservationsMutation } from '../app/apiSlice'




    const Home = () => {
        const {
            data: reservations,
            isLoading,
            error,
        } = useCreateReservationsMutation()
        console.log(reservations)
        if (isLoading) return <div>Loading pools...</div>
        if (error) return <div>Error loading pools: {error.message}</div>
        return (<h1>Hello</h1>)
    }






export default Home;
