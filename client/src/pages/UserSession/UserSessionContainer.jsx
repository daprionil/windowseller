import { Outlet } from "react-router-dom"
import HeaderUserAccount from "../../components/UserSession/HeaderUserAccount"

const UserSessionContainer = () => {
    return (
        <div>
            <HeaderUserAccount />
            <div className="p-4 md:p-6 lg:p-8">
                <Outlet/>
            </div>
        </div>
    )
}

export default UserSessionContainer