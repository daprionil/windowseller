import SignInForm from "../../components/LandingPage/SignInForm"

const SignInPage = () => {
    return (
        <div className='block mt-10 mx-auto space-y-5 lg:grid lg:grid-cols-2 lg:max-w-5xl lg:items-center lg:space-x-6'>
            <div>
                <h1 className=' text-4xl lg:text-6xl drop-shadow-xl font-black text-center'>
                    Registrate y <span className='text-yellow-500'>Promociona</span> tus Productos
                </h1>
            </div>
            <div className='shadow-xl rounded overflow-hidden p-2 w-full max-w-md lg:max-w-none mx-auto'>
                <SignInForm />
            </div>
        </div>
    )
}

export default SignInPage