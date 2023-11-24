import { useState } from "react";
import { FaCircleUser } from 'react-icons/fa6';
import { RiUserSettingsLine } from 'react-icons/ri';

import Loader from "../../components/Loader";
import useGetUserData from "../../hooks/useGetUserData";
import formatDate from "../../utils/formatDate";
import ProfileForm from "../../components/UserSession/ProfileForm";

const ProfileUser = () => {
    const [loading, user] = useGetUserData();
    const [profileMode, setProfileMode] = useState(false);

    return (
        <div>
            <div className="bg-white shadow py-2 px-4 rounded-md">
                <h1 className="font-black text-lg">Mi Perfil</h1>
            </div>
            <div className="mt-6 bg-white shadow-xl rounded-md overflow-hidden h-full">
                {
                    loading ?
                        <div className="text-center py-4 px-4">
                            <Loader />
                        </div>
                        : user === null || user?.error ?
                            <p>{user?.error ?? 'Ha habido un error al cargar tu usuario'}</p>
                            : <div className="">
                                <div className="grid grid-cols-2">
                                    <div
                                        className={`p-4 flex items-center cursor-pointer justify-center text-slate-100 text-3xl [&>svg]:drop-shadow-md ${!profileMode ? "bg-slate-500" : 'bg-slate-300'}`}
                                        onClick={() => setProfileMode(false)}
                                    >
                                        <FaCircleUser />
                                    </div>
                                    <div
                                        className={`p-4 flex items-center cursor-pointer justify-center text-slate-100 text-3xl [&>svg]:drop-shadow-md ${profileMode ? "bg-slate-500" : 'bg-slate-300'}`}
                                        onClick={() => setProfileMode(true)}
                                    >
                                        <RiUserSettingsLine />
                                    </div>
                                </div>
                                <div className="p-8">
                                {
                                    profileMode ?
                                        <div className="relative">
                                            <ProfileForm {...user} />
                                            <button
                                                className="bottom-0 left-0 absolute btn_base bg-red-500 text-white font-black"
                                                onClick={() => setProfileMode(false)}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    :
                                        <>
                                            <div className="py-2 space-y-2">
                                                <p className="font-bold">Nombre de compañía</p>
                                                <div className="px-2 py-1 rounded-md bg-stone-100 shadow font-thin">
                                                    {user.namecompany}
                                                </div>
                                            </div>
                                            <div className="py-2 space-y-2">
                                                <p className="font-bold">Eslogan</p>
                                                <div className="px-2 py-1 rounded-md bg-stone-100 shadow font-thin">
                                                    {user.eslogan}
                                                </div>
                                            </div>
                                            <div className="py-2 space-y-2">
                                                <p className="font-bold">Descripción</p>
                                                <div className="px-2 py-1 rounded-md bg-stone-100 shadow font-thin">
                                                    {user.description}
                                                </div>
                                            </div>
                                            <div className="py-2 space-y-2">
                                                <p className="font-bold">Correo Electrónico</p>
                                                <div className="px-2 py-1 rounded-md bg-stone-100 shadow font-thin">
                                                    {user.email}
                                                </div>
                                            </div>
                                            <div className="py-2 space-y-2">
                                                <p className="font-bold">Número telefónico</p>
                                                <div className="px-2 py-1 rounded-md bg-stone-100 shadow font-thin">
                                                    {user.phone}
                                                </div>
                                            </div>
                                            <div className="py-2 space-y-2">
                                                <p className="font-bold">Última actualización de datos</p>
                                                <div className="px-2 py-1 rounded-md bg-stone-100 shadow font-thin">
                                                    {formatDate(user.updatedAt)}
                                                </div>
                                            </div>
                                        </>
                                }
                                </div>
                            </div>
                }
            </div>
        </div>
    )
}

export default ProfileUser;