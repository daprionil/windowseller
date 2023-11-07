import { Formik } from "formik";
import { errorsFieldValidations, fieldValidations, nameFields } from "../../utils/formValidations";
import Message, { typeMessages } from "../Message";
import logInRequest from "../../handlers/logInRequest";

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
            onSubmit={({email, password}, {setFieldError, resetForm, setSubmitting}) => {
                setSubmitting(false);
                logInRequest({email, password})
                    .then(({data}) => {
                        if(data.session){
                            //* #### SET HERE THE TOKEN SESSION
                        }
                        resetForm();
                    })
                    .catch(({response:{data}}) => {
                        if(data?.error){
                            //! Set error
                            setFieldError('base', data.error);
                            return;
                        }
                        setFieldError('base', 'Ha habido un error inesperado, Intentelo más tarde');
                    })
                    .finally(() => setSubmitting(true));
            }}
        >
            {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
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
                    {
                        errors.base && <Message msg={errors.base} type={typeMessages.error} />
                    }
                    <button
                        type="submit"
                        className='btn_base font-bold text-white bg-stone-500 cursor-pointer'
                        style={{ background: "rgb(77, 69, 61)" }}
                        disabled={isSubmitting}
                    >
                        Ingresar
                    </button>
                </form>
            )}
        </Formik>
    )
}

export default LogInForm