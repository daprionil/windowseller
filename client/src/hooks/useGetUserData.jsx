import { useEffect, useRef, useState } from "react"
import getUserDataSession from "../handlers/getUserDataSessionRequest";
import useSessionUserStore from "../stores/useSessionUserStore";

const useGetUserData = () => {
    const userSession = useSessionUserStore(({usersession}) => usersession);
    const [ loading, setLoading ] = useState(true);
    const [ user, setUser ] = useState(null);
    const refRequest = useRef(false);

    useEffect(() => {
        if(!refRequest.current && !!userSession){
            refRequest.current = true;
            
            //* Starts request
            getUserDataSession({session:userSession})
                .then(({data}) => {
                    const {
                        createdAt, description, email, enable,
                        eslogan, namecompany, phone, updatedAt
                    } = data;
                    setUser({
                        createdAt, description, email, enable,
                        eslogan, namecompany, phone, updatedAt
                    });
                    setLoading(false);
                })
                .catch(() => {
                    setUser({
                        error: 'No se han logrado cargar los datos de tu cuenta'
                    });
                    setLoading(false);
                })
                .finally(() => refRequest.current = false);
        }else{
            setLoading(false);
        }
    },[userSession]);

    return [
        loading,
        user
    ]
}

export default useGetUserData