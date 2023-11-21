import { Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useShallow } from 'zustand/react/shallow'

import Loader from "../Loader";
import useSessionUserStore from "../../stores/useSessionUserStore";

const PrivateUserRoute = ({ children }) => {
    const [ validStarsSession, setValidStarsSession ] = useState(null);
    const userSession = useSessionUserStore(({ usersession }) => usersession);
    const {getUserBySession, removeUserSession, setUserData} = useSessionUserStore(
        useShallow(({ getUserBySession, removeUserSession, setUserData }) => (
            { getUserBySession, removeUserSession, setUserData }
        ))
    );
    const refGetUserRequest = useRef(false);

    useEffect(() => {
        //! To prevent redundant renderization
        if(!refGetUserRequest.current){
            refGetUserRequest.current = true;

            //! Get user with request by session token
            if(!userSession){
                setValidStarsSession(false);
                refGetUserRequest.current = false;
                return;
            }
            //? ###### CREATE ROUTE IN THE SERVER TO VALIDATE SESSION ########
        }
    },[userSession]);

    return (
        <>
            {
                validStarsSession === null ?
                    <div className="w-screen bg-stone-400 bg-opacity-30 h-screen fixed flex justify-center items-center">
                        <Loader />
                    </div>
                : validStarsSession ?
                        children
                    :   <Navigate to='/' replace />
            }
        </>
    )
}

export default PrivateUserRoute