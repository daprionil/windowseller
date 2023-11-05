import { Outlet } from "react-router-dom"
import HeaderLanding from "../../components/LandingPage/HeaderLanding"

const LandingPageContainer = () => {
    return (
        <div>
            <HeaderLanding />
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    )
}

export default LandingPageContainer;