import useGetUserData from "../../hooks/useGetUserData";
import formatDate from "../../utils/formatDate.js";
import Loader from "../Loader";

const ProfileViewDataUser = () => {
    const [loading, user] = useGetUserData();

    return (
        loading ?
            <div className="py-5 text-center">
                <Loader />
            </div>
            : user === null || user?.error ?
                <p>{user?.error ?? 'Ha habido un problema al cargar tus datos'}</p>
                : <>
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
    )
}

export default ProfileViewDataUser