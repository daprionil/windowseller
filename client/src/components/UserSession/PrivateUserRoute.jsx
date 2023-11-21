import { Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useShallow } from 'zustand/react/shallow'

import Loader from "../Loader";
import useSessionUserStore from "../../stores/useSessionUserStore";

const PrivateUserRoute = ({ children }) => {
    const [ validStarsSession, setValidStarsSession ] = useState(null);
    const userSession = useSessionUserStore(({ usersession }) => usersession);
    const {getUserBySession, removeUserSession} = useSessionUserStore(
        useShallow(({ getUserBySession, removeUserSession }) => (
            { getUserBySession, removeUserSession }
        ))
    );
    const refGetUserRequest = useRef(false);

    useEffect(() => {
        //! To prevent redundant renderization
        if(!refGetUserRequest.current){
            refGetUserRequest.current = true;

            //! Get user with request by session token
            const promiseGetUserBySession = getUserBySession();
            if(promiseGetUserBySession){
                promiseGetUserBySession
                    .then(() => {
                        //! ############ CONTINUE HERE ##########
                        /**
                         * Get the user info and set in the store
                         */
                        setValidStarsSession(true);
                    })
                    .catch(() => {
                        //! If the session token is invalid
                        setValidStarsSession(false);
                        removeUserSession();
                    })
                    .finally(() => {
                        refGetUserRequest.current = false;
                    })
            }
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