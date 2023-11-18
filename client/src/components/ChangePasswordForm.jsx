import { Formik } from "formik";
import { errorsFieldValidations, fieldValidations, nameFields } from "../utils/formValidations";
import Message, { typeMessages } from "./Message";
import changePasswordRequest from "../handlers/changePasswordRequest";
import { useState } from "react";
import Loader from "./Loader";
import SuccessIcon from '../components/SuccessIcon';
import LogInButton from "./LogInButton";

const ChangePasswordForm = ({ tokenId }) => {
    const [statusRequest, setStatusRequest] = useState(false);

    return (
        !statusRequest ?
            <div className="py-6 px-8 space-y-4">
                <SuccessIcon />
                <p className="font-black text-2xl text-center">
                    Tu contraseña se ha cambiado <span className=" text-3xl drop-shadow-xl text-yellow-500">Exitosamente</span>
                </p>
                <div className="h-1 w-full bg-stone-300"></div>
                <div className="flex items-center flex-col font-semibold text-center gap-4">
                    <p>¡Deja este impase!, Continúa <span className="drop-shadow-xl text-yellow-500">descubriendo</span> nuestra Plataforma</p>
                    <LogInButton />
                </div>
            </div>
            :
            <Formik
                initialValues={{
                    password: '',
                    password2: ''
                }}
                validate={({ password, password2 }) => {
                    let errors = [];
                    const valuesList = Object.entries({ password, password2 });
                    for (let [key, val] of valuesList) {
                        if (!val) {
                            errors.push([key, `${nameFields[key] ?? 'Este campo'} no puede estar vacío`]);
                            continue;
                        }

                        const validationField = fieldValidations[key]
                        if (validationField) {
                            const validation = validationField(val, { comparepass: password });
                            if (!validation) {
                                errors.push([key, errorsFieldValidations[key]]);
                                continue;
                            }
                        }
                    }

                    return Object.fromEntries(errors);
                }}
                onSubmit={({ password }, { resetForm, setFieldError, setSubmitting }) => {
                    //! Realize the request controller to changepassword POST/users/changepassword/:tokenId
                    setSubmitting(true);
                    changePasswordRequest({ password, tokenId })
                        .then(({ data }) => {
                            if (data.changed) {
                                resetForm(true);
                                setStatusRequest(data.changed);
                                return;
                            }
                        })
                        .catch(({ response: { data } }) => {
                            if (data.error) {
                                setFieldError('base', data.error);
                                return;
                            }
                            setFieldError('base', 'Ha habido un error, intentalo más tarde');
                        })
                        .finally(() => {
                            setSubmitting(false);
                        })
                    //! Body -> Password
                }}
            >
                {({ values: { password, password2 }, errors, handleSubmit, isSubmitting, handleChange }) => (
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
                            <div className="text-sm">
                                {
                                    errors.password && <Message msg={errors.password} type={typeMessages.ERROR} />
                                }
                            </div>
                        </label>
                        <label className="block">
                            <p className="font-bold">Repite tu Contraseña</p>
                            <input
                                type="password"
                                name="password2"
                                value={password2}
                                onChange={handleChange}
                                placeholder="Confirma tu nueva contraseña"
                            />
                            <div className="text-sm">
                                {
                                    errors.password2 && <Message msg={errors.password2} type={typeMessages.ERROR} />
                                }
                            </div>
                        </label>
                        {
                            isSubmitting ?
                                <div className="text-center">
                                    <Loader />
                                </div>
                                : <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="btn_base text-white font-bold"
                                    style={{ background: "rgb(77, 69, 61)" }}
                                >
                                    Reestablecer
                                </button>
                        }
                    </form>
                )}
            </Formik>
    )
}

export default ChangePasswordForm