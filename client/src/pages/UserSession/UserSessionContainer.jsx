import { Outlet } from "react-router-dom"
import { useState } from "react"
import { CiMenuFries } from 'react-icons/ci';

import HeaderUserAccount from "../../components/UserSession/HeaderUserAccount"

const UserSessionContainer = () => {
    const [ headerUIMode, setHeaderUIMode ] = useState(false);
    return (
        <div className="md:grid md:grid-cols-12 h-screen">
            <button
                className={`absolute text-white md:hidden text-xl font-black top-[1%] z-20 ${ headerUIMode ? 'bg-red-400' : 'bg-stone-500'} rounded-md right-[2%] px-4 py-3 shadow-xl`}
                onClick={() => setHeaderUIMode(state => !state)}
            >
                <CiMenuFries />
            </button>
            <div className={`md:col-span-3 h-full fixed w-full sm:w-[90%] transition-all duration-200 ${headerUIMode ? 'left-0' : 'left-full'} md:w-full md:static`}>
                <HeaderUserAccount />
            </div>
            <div className="p-4 md:p-6 lg:p-8 md:col-span-9 overflow-y-auto h-full bg-slate-200">
                <Outlet/>
            </div>
        </div>
    )
}

export default UserSessionContainer