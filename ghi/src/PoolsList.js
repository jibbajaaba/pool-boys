import { useGetAllPoolsQuery } from './app/apiSlice'

const PoolsList = () => {
    const result = useGetAllPoolsQuery()
    console.log({result})
    return <div>Hi</div>
};

export default PoolsList;
