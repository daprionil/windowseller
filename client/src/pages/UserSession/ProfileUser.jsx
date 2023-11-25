import { useState } from "react";
import { IoBusiness } from 'react-icons/io5';
import { RiListSettingsLine } from 'react-icons/ri';

import ProfileForm from "../../components/UserSession/ProfileForm";
import ProfileViewDataUser from "../../components/UserSession/ProfileViewDataUser";

const ProfileUser = () => {
    const [profileMode, setProfileMode] = useState(false);

    return (
        <div>
            <div className="bg-white shadow py-2 px-4 rounded-md">
                <h1 className="font-black text-lg">Mi Perfil</h1>
            </div>
            <div className="mt-6 bg-white shadow-xl rounded-md overflow-hidden h-full">
                <div className="grid grid-cols-2">
                    <div
                        className={`p-4 flex items-center cursor-pointer justify-center text-slate-100 text-3xl [&>svg]:drop-shadow-md ${!profileMode ? "bg-slate-500" : 'bg-slate-300'}`}
                        onClick={() => setProfileMode(false)}
                    >
                        <IoBusiness />
                    </div>
                    <div
                        className={`p-4 flex items-center cursor-pointer justify-center text-slate-100 text-3xl [&>svg]:drop-shadow-md ${profileMode ? "bg-slate-500" : 'bg-slate-300'}`}
                        onClick={() => setProfileMode(true)}
                    >
                        <RiListSettingsLine />
                    </div>
                </div>
                <div className="p-8">
                    {
                        profileMode ?
                            <div className="relative">
                                <ProfileForm />
                                <button
                                    className="bottom-0 left-0 absolute btn_base bg-red-500 text-white font-black"
                                    onClick={() => setProfileMode(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                            :
                            <ProfileViewDataUser />
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileUser;