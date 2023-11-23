import { Outlet } from "react-router-dom"
import HeaderUserAccount from "../../components/UserSession/HeaderUserAccount"

const UserSessionContainer = () => {
    return (
        <div className="grid grid-cols-12 h-screen">
            <div className="col-span-3 h-full">
                <HeaderUserAccount />
            </div>
            <div className="p-4 md:p-6 lg:p-8 col-span-9 overflow-y-auto h-full bg-slate-200">
                <Outlet/>
            </div>
        </div>
    )
}

export default UserSessionContainer