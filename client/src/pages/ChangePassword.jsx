import { useEffect, useRef, useState } from "react"
import HeaderLanding from "../components/LandingPage/HeaderLanding"
import ChangePasswordForm from "../components/ChangePasswordForm";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import validateTokenToChangePassword from "../handlers/validateTokenToChangePassword";
import ErrorIcon from "../components/ErrorIcon";
import Message, { typeMessages } from "../components/Message";

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
        //* Send request to validate token Id in the params
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
                            <p className="font-black text-4xl lg:text-6xl drop-shadow-lg">
                                ¡Es tu momento! Usa una contraseña que puedas <span className="text-yellow-500">Recordar!</span>
                            </p>
                        </div>
                        <div className="shadow-xl rounded-md max-w-md lg:max-w-none p-2 lg:mx-0 mx-auto">
                            {
                                tokenValidation.status ?
                                    <ChangePasswordForm {...{tokenId}}/>
                                :
                                    <div className="px-6 py-8 space-y-5">
                                        <div className="flex flex-nowrap items-center justify-center gap-5 relative">
                                            <p className="text-xl font-black">Parece que algo no ha ido bien</p>
                                            <ErrorIcon />
                                            <span className="absolute block w-full h-1 left-0 bg-stone-300 -bottom-4"></span>
                                        </div>
                                        <div className="text-center font-bold pt-2 relative">
                                            <Message type={typeMessages.ERROR} msg={tokenValidation.msg} />
                                            <span className="absolute block w-full h-1 left-0 bg-stone-300 -bottom-4"></span>
                                        </div>
                                        <div className="font-bold pt-2 text-center space-y-2">
                                            <p className="text-xl">Descubre nuestra plataforma</p>
                                            <button className="btn_base bg-thirdyellow text-white">Ir a Descubrir</button>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
            }
        </>
    )
}

export default ChangePassword