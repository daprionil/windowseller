import { Outlet } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { CiMenuFries } from 'react-icons/ci';
import { useShallow } from 'zustand/react/shallow';

import HeaderUserAccount from "./HeaderUserAccount"
import useCategoriesUserStore from "../../stores/useCategoriesUserStore";

const UserSessionContainer = () => {
    const [ headerUIMode, setHeaderUIMode ] = useState(false);
    const { getAllCategories } = useCategoriesUserStore(
        useShallow(({ getAllCategories }) => ({
            getAllCategories
        }))
    );
    const refRequests = useRef(false);

    useEffect(() => {
        if(refRequests.current) return;
        refRequests.current = true;
        
        //? STARTS THE APP
        const promisesUserSessionStarts = [
            getAllCategories()
        ];
        Promise.allSettled(promisesUserSessionStarts).finally(() => {
            refRequests.current = false;
        });
    },[]);
    
    return (
        <div className="md:grid md:grid-cols-12 h-screen">
            <button
                className={`absolute text-white md:hidden text-xl font-black top-[1%] z-50 ${ headerUIMode ? 'bg-red-400' : 'bg-stone-500'} rounded-md right-[2%] px-4 py-3 shadow-xl`}
                onClick={() => setHeaderUIMode(state => !state)}
            >
                <CiMenuFries />
            </button>
            <div className={`md:col-span-3 h-full z-40 fixed w-full sm:w-[90%] transition-all duration-200 ${headerUIMode ? 'left-0' : 'left-full'} md:w-full md:static`}>
                <HeaderUserAccount />
            </div>
            <div className="p-4 md:p-6 lg:p-8 md:col-span-9 overflow-y-auto h-full bg-slate-200">
                <Outlet/>
            </div>
        </div>
    )
}

export default UserSessionContainer