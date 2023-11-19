import { Navigate } from "react-router-dom";
import useSessionUserStore from "../../stores/useSessionUserStore";
import Loader from "../Loader";

const PrivateUserRoute = ({ children }) => {
    const userSession = useSessionUserStore(({ usersession }) => usersession);

    return (
        <>
            {
                userSession === null ?
                    <div className="w-screen bg-stone-400 bg-opacity-30 h-screen fixed flex justify-center items-center">
                        <Loader />
                    </div>
                : userSession ?
                        children
                    :   <Navigate to='/' replace />
            }
        </>
    )
}

export default PrivateUserRoute