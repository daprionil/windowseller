import { Navigate } from "react-router-dom";
import LogInForm from "../../components/LandingPage/LogInForm"
import useSessionUserStore from "../../stores/useSessionUserStore"

const LogInPage = () => {
    const userSession = useSessionUserStore(({usersession}) => usersession);

    return (
        !userSession ?
            <div className='block mt-10 mx-auto space-y-5 lg:grid lg:grid-cols-2 lg:max-w-5xl lg:items-center lg:space-x-6'>
                <div>
                    <p className=' text-4xl lg:text-6xl drop-shadow-xl font-black text-center'>
                        Inicia sesión y <span className='text-yellow-500'>Administra</span> tus Catálogos
                    </p>
                </div>
                <div className='shadow-xl rounded overflow-hidden p-2 w-full max-w-md lg:max-w-none mx-auto'>
                    <LogInForm />
                </div>
            </div>
        :   <Navigate to='/account' replace/>
    )
}

export default LogInPage