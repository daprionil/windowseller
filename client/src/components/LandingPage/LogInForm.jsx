import { Formik } from "formik";
import { errorsFieldValidations, fieldValidations, nameFields } from "../../utils/formValidations";
import Message, { typeMessages } from "../Message";

const LogInForm = () => {
    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validate={(values) => {
                let errors = [];
                const objectValues = Object.entries(values);

                //? Validate fields
                for (let [key, val] of objectValues) {
                    if (!val) {
                        errors.push([key, `${nameFields[key]} no puede estar vacío`]);
                        continue;
                    }

                    const validationField = fieldValidations[key];
                    if (!validationField) continue;

                    const fieldValidate = validationField(val);
                    if (!fieldValidate) {
                        errors.push([key, errorsFieldValidations[key]]);
                        continue;
                    }
                }

                return Object.fromEntries(errors);
            }}
            onSubmit={({email, password}, {setErrors, setSubmitting, resetForm}) => {
                
            }}
        >
            {({ handleChange, handleSubmit, values, errors }) => (
                <form
                    className='space-y-4 w-full py-8 px-6'
                    onSubmit={handleSubmit}
                >
                    <label className='block'>
                        <p className='font-bold'>Correo Electrónico</p>
                        <input
                            type="email"
                            name="email"
                            placeholder='Escribe aquí tu Email'
                            onChange={handleChange}
                            value={values.email}
                        />
                        {
                            errors.email && <Message msg={errors.email} type={typeMessages.error} />
                        }
                    </label>
                    <label className='block'>
                        <p className='font-bold'>Contraseña</p>
                        <input
                            type="password"
                            name="password"
                            placeholder='Escribe tu credencial'
                            onChange={handleChange}
                            value={values.password}
                        />
                        {
                            errors.password && <Message msg={errors.password} type={typeMessages.error} />
                        }
                    </label>
                    <button
                        type="submit"
                        className='btn_base font-bold text-white bg-stone-500 cursor-pointer'
                        style={{ background: "rgb(77, 69, 61)" }}
                    >
                        Ingresar
                    </button>
                </form>
            )}
        </Formik>
    )
}

export default LogInForm