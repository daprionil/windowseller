import { useState } from "react";
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
            <div className="mt-6 bg-white px-4 py-4 shadow-xl rounded-md h-full">
                {
                    loading ?
                        <div className="text-center py-4">
                            <Loader />
                        </div>
                        : user === null || user?.error ?
                            <p>{user?.error ?? 'Ha habido un error al cargar tu usuario'}</p>
                            : <div className="">
                                {
                                    profileMode ?
                                        <ProfileForm {...user} />
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
                                <div className="py-4 flex items-center flex-nowrap">
                                    <button
                                        className={`btn_base font-bold ${profileMode ? 'bg-red-500 text-white' : 'bg-stone-200'}`}
                                        onClick={() => setProfileMode(state => !state)}
                                    >
                                        {
                                            profileMode ?
                                                'Cancelar'
                                            :   'Actualizar Información'
                                        }
                                    </button>
                                </div>
                            </div>
                }
            </div>
        </div>
    )
}

export default ProfileUser;