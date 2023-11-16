import { Formik } from "formik";
import { errorsFieldValidations, fieldValidations, nameFields } from "../utils/formValidations";
import Message, { typeMessages } from "./Message";

const ChangePasswordForm = () => {
    return (
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
                };

                return Object.fromEntries(errors);
            }}
            onSubmit={({password}) => {
                //! Realize the request controller to changepassword POST/users/changepassword/:tokenId
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
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn_base text-white font-bold"
                        style={{ background: "rgb(77, 69, 61)" }}
                    >
                        Reestablecer
                    </button>
                </form>
            )}
        </Formik>
    )
}

export default ChangePasswordForm