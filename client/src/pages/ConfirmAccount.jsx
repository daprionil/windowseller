import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom"

import confirmUserAccountRequest from "../handlers/confirmUserAccountRequest";
import WindowSellerIcon from "../components/WindowSellerIcon";
import LogInButton from '../components/LogInButton';
import Loader from "../components/Loader";
import SignInButton from "../components/SignInButton";
import SuccessIcon from "../components/SuccessIcon";

const ConfirmAccout = () => {
    const { tokenId } = useParams();

    const [loading, setLoading] = useState(false);
    const [statusConfirm, setStatusConfirm] = useState({status: undefined, msg:''});
    const refEjecution = useRef(false);

    useEffect(() => {
        setLoading(true);
        if (refEjecution.current) return;

        refEjecution.current = true;
        confirmUserAccountRequest({ tokenId })
            .then(({data}) => {
                if(data.confirmed){
                    setStatusConfirm({
                        status: true,
                        msg: '¡Tu cuenta ha sido confirmada!'
                    })
                }
            })
            .catch(({ response: { data } }) => {
                if (data.error) {
                    setStatusConfirm({status: false, msg: data.error});
                    return;
                }
                setStatusConfirm({
                    status: false,
                    msg: 'Ha ocurrido un error, intentalo más tarde'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <header className="flex items-center justify-between lg:justify-around p-2 bg-yellow-400 shadow-md">
                <div className="pl-3">
                    <WindowSellerIcon />
                </div>
                <div>
                    <nav>
                        <ul className="flex items-center flex-nowrap space-x-3 font-semibold">
                            <li>
                                <NavLink to='/' className={({isActive}) => isActive ? 'underline' : 'no-underline'}>
                                    Inicio
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className="max-w-xl mt-10 py-10 px-5 rounded-md shadow mx-auto">
                {
                    loading ?
                        <div className=" mx-auto w-min drop-shadow">
                            <Loader />
                        </div>
                    : statusConfirm.status ?
                            <div className="space-y-5">
                                <h2 className="text-center text-2xl font-bold border-b-2 border-opacity-40 border-yellow-600">
                                    ¡Que bueno saber que estás <span className="text-yellow-500 font-black">Aquí!</span>
                                </h2>
                                <SuccessIcon />
                                <div className="text-center">
                                    <p>Tu cuenta ha sido confirmada satisfactoriamente</p>
                                </div>
                            </div>
                            :
                            <div className="space-y-5">
                                <h2 className="text-center text-2xl font-bold border-b-2 border-opacity-40 border-yellow-600">
                                    Oops! Ha habido un
                                    <span className="text-yellow-500 font-black"> Problema</span>
                                </h2>
                                <div className="text-center">
                                    <p className="text-red-500 font-bold text-xl">{statusConfirm.msg}</p>
                                </div>
                            </div>
                }
                <div className="pt-6 pb-3 text-center space-y-5">
                    <div className="text-2xl text-stone-600 drop-shadow-xl">
                        <p className="font-black">¡Navega!</p>
                        <p> por nuestra plataforma</p>
                    </div>
                    <div className="flex flex-nowrap items-center space-x-4 justify-center">
                        <LogInButton />
                        <SignInButton />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmAccout