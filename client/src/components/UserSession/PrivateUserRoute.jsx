import { Navigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import Loader from "../Loader";
import useSessionUserStore from "../../stores/useSessionUserStore";
import getUserDataSession from "../../handlers/getUserDataSession";

const PrivateUserRoute = ({ children }) => {
    const [ validStarsSession, setValidStarsSession ] = useState(null);
    const userSession = useSessionUserStore(({ usersession }) => usersession);
    const removeUserSession = useSessionUserStore(({ removeUserSession }) => removeUserSession);
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
            
            //? ###### Validate Session with GET/v1/users/
            getUserDataSession({session:userSession})
                .then(({data}) => {
                    //? Apriori. CREATE ROUTE USER TO SEARCH OPEN SESSIONS IN THE STORAGE DB TO VALIDATE LOG INS
                    //! Is the user is enable to stars session
                    if(data.enable){
                        setValidStarsSession(data.enable);
                        return;
                    }
                    removeUserSession();
                    setValidStarsSession(false);
                })
                .catch(() => {
                    setValidStarsSession(false);
                    removeUserSession();
                })
                .finally(() => {
                    refGetUserRequest.current = false;
                });
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