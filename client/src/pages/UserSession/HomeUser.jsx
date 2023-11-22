import Loader from "../../components/Loader";
import useGetUserData from "../../hooks/useGetUserData"

const HomeUser = () => {
    const [ loading, user ] = useGetUserData();

    return (
        <div>
            <div className="">
                {
                    loading ?
                        <div className="text-center py-4">
                            <Loader />
                        </div>
                    :   <p>
                            {JSON.stringify(user)}
                        </p>
                }
            </div>
        </div>
    )
}

export default HomeUser