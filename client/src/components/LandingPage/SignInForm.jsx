import { Formik } from "formik";
import { errorsFieldValidations, fieldValidations, nameFields } from "../../utils/formValidations";
import Message, { typeMessages } from "../Message";
import { useState } from "react";
import registerUserRequest from "../../handlers/registerUserRequest";
import SuccessIcon from "../SuccessIcon";
import LogInButton from "../LogInButton";
import Loader from "../Loader";

const SignInForm = () => {
    const [sectionActive, setSectionActive] = useState(0);
    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                password2: '',
                namecompany: '',
                eslogan: '',
                description: '',
                phone: ''
            }}
            validate={(values) => {
                let errors = [];
                const objectValues = Object.entries(values);

                //? Validate fields
                for (let [key, val] of objectValues) {
                    if (!val) {
                        errors.push([key, `${nameFields[key] ?? 'Este campo'} no puede estar vacío`]);
                        continue;
                    }

                    const validationField = fieldValidations[key];
                    if (!validationField) continue;
                    
                    //? Validate fields with password how second argument
                    const fieldValidate = validationField(val, {comparepass:values.password});
                    if (!fieldValidate) {
                        errors.push([key, errorsFieldValidations[key]]);
                        continue;
                    }
                }
                //? If exists error display base error
                if(errors.length){
                    errors.push(['base','Existen campos sin completar']);
                }
                return Object.fromEntries(errors);
            }}
            onSubmit={(values, { resetForm, setSubmitting, setFieldError }) => {
                setSubmitting(true);
                const {namecompany, description, eslogan, phone, email, password} = values;
                registerUserRequest({namecompany, description, eslogan, phone, email, password})
                    .then(({data}) => {
                        if(data.created){
                            //? Clear all field in form
                            resetForm();
                            //? Set success view
                            setSectionActive(3);
                            return;
                        }
                    })
                    .catch(({response:{data}}) => {
                        if(!data.error){
                            setFieldError('base','Ha ocurrido un error');
                            return;
                        }
                        setFieldError('base', data.error);
                    })
                    .finally(() => setSubmitting(false));
            }}
        >
            {({ handleChange, handleSubmit, values, errors, isSubmitting }) => (
                <form
                    className='py-8 px-6'
                    onSubmit={handleSubmit}
                >
                    <div className={`space-y-2 w-full ${sectionActive === 0 ? 'block' : 'hidden'}`}>
                        <h2 className="text-2xl font-black text-stone-800 text-center">
                            <span className="text-yellow-600">¡Comencemos!</span><br />
                            Define tu compañía
                        </h2>
                        <label className='block'>
                            <p className='font-bold'>Tú compañía</p>
                            <input
                                type="text"
                                name="namecompany"
                                placeholder='Nombre de compañía'
                                onChange={handleChange}
                                value={values.namecompany}
                            />
                            <div className="text-center text-sm">
                                {
                                    errors.namecompany && <Message msg={errors.namecompany} type={typeMessages.ERROR} />
                                }
                            </div>
                        </label>
                        <label className='block'>
                            <p className='font-bold'>Dale un toque!</p>
                            <input
                                type="text"
                                name="eslogan"
                                placeholder='Eslogan de tu empresa'
                                onChange={handleChange}
                                value={values.eslogan}
                            />
                            <div className="text-center text-sm">
                                {
                                    errors.eslogan && <Message msg={errors.eslogan} type={typeMessages.ERROR} />
                                }
                            </div>
                        </label>
                        <button
                            className="btn_base text-white font-bold"
                            style={{ background: "rgb(77, 69, 61)" }}
                            onClick={() => setSectionActive(1)}
                            type="button"
                        >
                            Siguiente
                        </button>
                    </div>
                    <div className={`space-y-2 w-full ${sectionActive === 1 ? 'block' : 'hidden'}`}>
                        <label className='block'>
                            <p className='font-bold'>Resume tu companía</p>
                            <textarea
                                className="w-full h-full h-26 bg-stone-100 rounded resize-none p-2"
                                name="description"
                                onChange={handleChange}
                                placeholder='¿Qué hace tu compañía?, ¿Qué vendes?'
                                value={values.description}
                            ></textarea>
                            <div className="text-center text-sm">
                                {
                                    errors.description && <Message msg={errors.description} type={typeMessages.ERROR} />
                                }
                            </div>
                        </label>
                        <label className='block'>
                            <p className='font-bold'>Número de whatsapp</p>
                            <input
                                type="number"
                                name="phone"
                                placeholder='Ej: (+57)3202999999'
                                className="w-full p-2 bg-stone-100"
                                onChange={handleChange}
                                value={values.phone}
                            />
                            <div className="text-center text-sm">
                                {
                                    errors.phone && <Message msg={errors.phone} type={typeMessages.ERROR} />
                                }
                            </div>
                        </label>
                        <div className="flex justify-between items-center flex-nowrap">
                            <button
                                className="btn_base text-white font-bold"
                                style={{ background: "rgb(77, 69, 61)" }}
                                onClick={() => setSectionActive(2)}
                                type="button"
                            >
                                Siguiente
                            </button>
                            <button
                                className="btn_base text-white font-bold"
                                style={{ background: "rgb(123, 118, 112)" }}
                                onClick={() => setSectionActive(0)}
                                type="button"
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                    <div className={`space-y-2 w-full ${sectionActive === 2 ? 'block' : 'hidden'}`}>
                        <label className='block'>
                            <p className='font-bold'>Correo Electrónico</p>
                            <input
                                type="email"
                                name="email"
                                placeholder='Tu Correo Electrónico'
                                onChange={handleChange}
                                value={values.email}
                            />
                            <div className="text-center text-sm">
                                {
                                    errors.email && <Message msg={errors.email} type={typeMessages.ERROR} />
                                }
                            </div>
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
                            <div className="text-center text-sm">
                                {
                                    errors.password && <Message msg={errors.password} type={typeMessages.ERROR} />
                                }
                            </div>
                        </label>
                        <label className='block'>
                            <p className='font-bold'>Repite tu contraseña</p>
                            <input
                                type="password"
                                name="password2"
                                placeholder='Confirma tu contraseña'
                                onChange={handleChange}
                                value={values.password2}
                            />
                            <div className="text-center text-sm">
                                {
                                    errors.password2 && <Message msg={errors.password2} type={typeMessages.ERROR} />
                                }
                            </div>
                        </label>
                        {
                            errors.base && <Message msg={errors.base} type={typeMessages.ERROR}/>
                        }
                        <div className="flex justify-between items-center flex-nowrap">
                            <div className="py-2">
                                {
                                    isSubmitting ?
                                        <div className=" transform scale-90">
                                            <Loader />
                                        </div>
                                    :   <button
                                            type="submit"
                                            className='btn_base font-bold text-white bg-stone-500 cursor-pointer'
                                            style={{ background: "rgb(77, 69, 61)" }}
                                        >
                                            Registrarse
                                        </button>
                                }
                            </div>
                            <button
                                className="btn_base text-white font-bold"
                                style={{ background: "rgb(123, 118, 112)" }}
                                type="button"
                                onClick={() => setSectionActive(1)}
                            >
                                Volver
                            </button>
                        </div>
                    </div>
                    <div className={`space-y-2 w-full ${sectionActive === 3 ? 'block' : 'hidden'}`}>
                        <SuccessIcon />
                        <div className="text-center pt-5 space-y-5">
                            <p className="font-bold text-xl">¡¡Te has logeado satisfactoriamente!!</p>
                            <span>Ve a tu correo electrónico y confirma tu cuenta</span>
                            <div className="[&>button:first-child]:bg-red-500 [&>button:first-child]:text-white">
                                <LogInButton />
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default SignInForm
