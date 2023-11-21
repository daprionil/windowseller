import { useEffect, useRef, useState } from "react"
import getUserDataSession from "../handlers/getUserDataSession";
import useSessionUserStore from "../stores/useSessionUserStore";

const useGetUserData = () => {
    const userSession = useSessionUserStore(({usersession}) => ({usersession}));
    const [ loading, setLoading ] = useState(false);
    const [ user, setUser ] = useState(null);
    const refRequest = useRef(false);

    useEffect(() => {
        if(!refRequest.current && !!userSession){
            refRequest.current = true;
            
            //* Starts request
            setLoading(true);
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
                })
                .catch(() => {
                    setUser({
                        error: 'No se han logrado cargar los datos de tu cuenta'
                    })
                })
                .finally(() => {
                    refRequest.current = false;
                    setLoading(false);
                });
        }
    },[userSession]);

    return [
        loading,
        user
    ]
}

export default useGetUserData