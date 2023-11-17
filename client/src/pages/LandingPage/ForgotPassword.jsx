import { Formik } from "formik";
import Message from "../../components/Message";
import { typeMessages } from "../../components/Message";
import { errorsFieldValidations, fieldValidations, nameFields } from "../../utils/formValidations";
import toChangePasswordRequest from "../../handlers/toChangePasswordRequest";
import { useState } from "react";
import Loader from "../../components/Loader";
import SuccessIcon from "../../components/SuccessIcon";
import LogInButton from "../../components/LogInButton";
import SignInButton from "../../components/SignInButton";

function ForgotPassword() {
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [statusRequestSubmit, setStatusRequestSubmit] = useState(false);

    return (
        <>
            <div className="block mt-10 mx-auto space-y-5 lg:grid lg:grid-cols-2 lg:max-w-5xl lg:items-center lg:space-x-6">
                <div>
                    <h2 className="text-4xl lg:text-6xl drop-shadow-xl font-black text-center">
                        Si olvidaste tu contraseña, <span className="text-yellow-500 underline">¡Recupérala!</span>
                    </h2>
                </div>
                <div className="shadow-xl rounded overflow-hidden p-2 w-full max-w-md lg:max-w-none mx-auto">
                    {
                        statusRequestSubmit ?
                            //! MEJORAR DISEÑO
                            <div className="px-6 py-8 w-full space-y-4">
                                <SuccessIcon />
                                <p className=" text-center font-bold text-xl">Hemos enviado <span>satisfactoriamente</span> a tu correo el cambio de Contraseña</p>
                                <p className=" text-center">Revisa tu Email</p>
                                <div className="h-1 w-full my-2 bg-stone-300 bg-opacity-30"></div>
                                <div className="flex place-content-center gap-4 w-full">
                                    <LogInButton />
                                    <SignInButton/>
                                </div>
                            </div>
                        : <Formik
                                initialValues={{
                                    email: ''
                                }}
                                validate={({ email }) => {
                                    if (!email) {
                                        return {
                                            email: `${nameFields.email} no puede estar vacío`
                                        };
                                    }
                                    //! If there is validation for 'email' and is a valid result
                                    const validation = fieldValidations['email'](email);
                                    if (!validation) {
                                        return {
                                            email: errorsFieldValidations.email
                                        };
                                    }
                                }}
                                onSubmit={(values, { setFieldError, setSubmitting, resetForm }) => {
                                    setSubmitting(true);
                                    setLoadingRequest(true)
                                    //! Send request to send mail with the option to password change
                                    toChangePasswordRequest({ email: values.email })
                                        .then(({ data }) => {
                                            //! If the response is successful and the email is sent
                                            if (data.sending) {
                                                resetForm();
                                                setStatusRequestSubmit(data.sending);
                                                return;
                                            }
                                        })
                                        .catch(({response:{data}}) => {
                                            if(data.error){
                                                setFieldError('base', data.error);
                                                return;
                                            }
                                            setFieldError('base', 'Ha habido un problema, intentalo más tarde');
                                        })
                                        .finally(() => {
                                            setSubmitting(false);
                                            setLoadingRequest(false);
                                        });
                                }}
                            >
                                {({ values: { email }, handleChange, isSubmitting, handleSubmit, errors }) => {
                                    return (
                                        <form className="py-8 px-6 space-y-4" onSubmit={handleSubmit}>
                                            <p className="text-2xl font-black text-center">
                                                Te enviaremos un Email<br />
                                                <span className="text-yellow-500">¡Revísalo!</span>
                                            </p>
                                            <label className="block">
                                                <p className="font-bold">Email</p>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={handleChange}
                                                    placeholder="Correo electrónico"
                                                />
                                                <div className="text-center text-sm">
                                                    {
                                                        errors.email && <Message msg={errors.email} type={typeMessages.ERROR} />
                                                    }
                                                </div>
                                            </label>
                                            {
                                                errors.base && <Message msg={errors.base} type={typeMessages.ERROR}/>
                                            }
                                            {
                                                loadingRequest ?
                                                    <div className="mx-auto w-min drop-shadow-xl">
                                                        <Loader />
                                                    </div>
                                                    : <button
                                                        type="submit"
                                                        className="btn_base font-bold text-white bg-stone-500"
                                                        style={{ background: "rgb(77, 69, 61)" }}
                                                        disabled={isSubmitting}
                                                    >
                                                        Enviar
                                                    </button>
                                            }
                                        </form>
                                    )
                                }}
                            </Formik>
                    }
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;