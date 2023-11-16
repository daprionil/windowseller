import { Formik } from "formik";
import Message from "../../components/Message";
import { typeMessages } from "../../components/Message";

function ForgotPassword() {
    return (
        <>
            <div className="block mt-10 mx-auto space-y-5 lg:grid lg:grid-cols-2 lg:max-w-5xl lg:items-center lg:space-x-6">
                <div>
                    <h2 className="text-4xl lg:text-6xl drop-shadow-xl font-black text-center">
                        Si olvidaste tu contraseña, <span className="text-yellow-500 underline">¡Recupérala!</span>
                    </h2>
                </div>
                <div className="shadow-xl rounded overflow-hidden p-2 w-full max-w-md lg:max-w-none mx-auto">
                    <Formik
                        initialValues={{
                            email: ''
                        }}
                        validate={({email}) => {
                            
                        }}
                        onSubmit={console.log}
                    >
                        {({values:{email}, handleChange, isSubmitting, handleSubmit, errors}) => {
                            return (
                                <form className="py-8 px-6 space-y-4" onSubmit={handleSubmit}>
                                    <p className="text-2xl font-black text-center">
                                        Te enviaremos un Email<br />
                                        <span className="text-yellow-500">¡Revísalo!</span>
                                    </p>
                                    <label className="block">
                                        <p className="font-bold">Email</p>
                                        <input
                                            type="text"
                                            name="email"
                                            value={email}
                                            onChange={handleChange}
                                            placeholder="Correo electrónico"
                                        />
                                    </label>
                                    {
                                        errors.email && <Message msg={errors.email} type={typeMessages.error} />
                                    }
                                    <button
                                        type="submit"
                                        className="btn_base font-bold text-white bg-stone-500"
                                        style={{ background: "rgb(77, 69, 61)" }}
                                        disabled={isSubmitting}
                                    >
                                        Enviar
                                    </button>
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;