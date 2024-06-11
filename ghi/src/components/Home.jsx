import { useGetUserQuery } from "../app/apiSlice";
import { useSignoutUserMutation } from "../app/apiSlice";

const Home = () => {
    const { data: user, isLoading } = useSignoutUserMutation()
    if (isLoading) return <div>Loading...</div>
    console.log(user)
    return (
                <h1>Hello</h1>
    );
};

export default Home;
