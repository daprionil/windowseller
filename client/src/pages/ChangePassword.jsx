import { useEffect, useRef, useState } from "react"
import HeaderLanding from "../components/LandingPage/HeaderLanding"
import ChangePasswordForm from "../components/ChangePasswordForm";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import validateTokenToChangePassword from "../handlers/validateTokenToChangePassword";

const ChangePassword = () => {
    const { tokenId } = useParams()
    const [loading, setLoading] = useState(false);
    const [ tokenValidation, setTokenValidation ] = useState({status: false, msg: ''});
    const refStartsValidation = useRef(false);

    useEffect(() => {
        if(refStartsValidation.current) return;
        
        //* starts with token validation
        refStartsValidation.current = true;
        setLoading(true);
        validateTokenToChangePassword({tokenId})
            .then(({data, status}) => {
                if(data.isValid && status === 200){
                    setTokenValidation({status: data.isValid, msg: ''});
                    return;
                }
                setTokenValidation({status: false, msg: 'Ha habido un problema, intentalo más tarde'});
            })
            .catch(({response:{data}}) => {
                if(data.error){
                    setTokenValidation({status: false, msg: data.error});
                    return;
                }
                setTokenValidation({status: false, msg: 'No puedes continuar, intentalo más tarde'});
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            <HeaderLanding />
            {
                loading ?
                    <div className=" w-screen h-screen fixed top-0 left-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <Loader />
                    </div>
                :
                    <div className="grid mt-10 py-10 px-5 grid-cols-1 items-start lg:grid-cols-2">
                        <div className="py-8 px-6 max-w-lg lg:max-w-none text-center mx-auto">
                            <p className="font-black text-4xl lg:text-6xl">
                                ¡Es tu momento! Usa una que puedas <span className="text-yellow-500">Recordar!</span>
                            </p>
                        </div>
                        <div className="shadow-xl rounded-md max-w-md lg:max-w-none p-2 lg:mx-0 mx-auto">
                            {
                                tokenValidation.status ?
                                    <ChangePasswordForm />
                                :
                                    <div className="px-6 py-8">
                                        {tokenValidation.msg}
                                    </div>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default ChangePassword