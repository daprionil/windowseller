import { useEffect, useState } from "react"
import HeaderLanding from "../components/LandingPage/HeaderLanding"
import { Formik } from "formik";

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(loading);
    }, [])

    return (
        <>
            <HeaderLanding />
            <div className="grid mt-10 py-10 px-5 grid-cols-1 items-start lg:grid-cols-2">
                <div className="py-8 px-6 max-w-lg lg:max-w-none text-center mx-auto">
                    <p className="font-black text-4xl lg:text-6xl">
                        ¡Es tu momento! Usa una que puedas <span className="text-yellow-500">Recordar!</span>
                    </p>
                </div>
                <div className="shadow-xl  rounded-md max-w-md lg:max-w-none p-2 lg:mx-0 mx-auto">
                    <Formik
                        initialValues={{
                            password: '',
                            repeatpassword: ''
                        }}
                        
                    >
                        {({ values: { password, repeatpassword }, handleSubmit, isSubmitting, handleChange }) => (
                            <form
                                onSubmit={handleSubmit}
                                className="px-6 py-8 space-y-5"
                            >
                                <h1 className="text-center font-black">Cambia tu Contraseña</h1>
                                <label className="block">
                                    <p className="font-bold">Contraseña</p>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handleChange}
                                        placeholder="Nueva Contraseña"
                                    />
                                </label>
                                <label className="block">
                                    <p className="font-bold">Repite tu Contraseña</p>
                                    <input
                                        type="password"
                                        name="password"
                                        value={repeatpassword}
                                        onChange={handleChange}
                                        placeholder="Confirma tu nueva contraseña"
                                    />
                                </label>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn_base text-white font-bold"
                                    style={{ background: "rgb(77, 69, 61)" }}
                                >Reestablecer</button>
                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default ChangePassword