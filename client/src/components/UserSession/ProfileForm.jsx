import { useState } from "react";
import { Formik } from "formik"

import Message, { typeMessages } from "../Message.jsx";
import { errorsFieldValidations, fieldValidations, nameFields } from "../../utils/formValidations";
import Loader from "../Loader";
import useGetUserData from "../../hooks/useGetUserData.jsx";
import updateBasicUserDataRequest from "../../handlers/updateBasicUserDataRequest.js";
import useSessionUserStore from "../../stores/useSessionUserStore.js";

const ProfileForm = ({callback}) => {
    const [loading, user] = useGetUserData();
    const [ statusRequestForm, setStatusRequestForm ] = useState({type:null, msg: null});
    const userSession = useSessionUserStore(({usersession}) => usersession);

    const changeStatusRequest = (type, msg) => {
        setStatusRequestForm({
            type: ({
                'error': typeMessages.ERROR,
                'success': typeMessages.SUCCESS
            })[type] ?? typeMessages.ERROR,
            msg
        })
    }

    return (
        loading ?
            <div className="py-5 text-center">
                <Loader />
            </div>
            : user === null || user?.error ?
                <Message msg="Ha habido un problema al cargar el formulario" type={typeMessages.ERROR} />
                : <Formik
                    initialValues={{
                        namecompany: user.namecompany,
                        eslogan: user.eslogan,
                        description: user.description,
                        phone: user.phone,
                    }}
                    validate={(values) => {
                        let errors = [];
                        const listValues = Object.entries(values);
                        for (let [key, val] of listValues) {
                            const currentValue = (val + '').trim();
                            if (!currentValue) {
                                errors.push([key, `${nameFields[key]} no puede estar vacío`]);
                                continue;
                            }
                            if (currentValue.length < 8) {
                                errors.push([key, `${nameFields[key]} debe contener más de 8 carácteres`]);
                                continue;
                            }
                            const validation = fieldValidations[key];
                            if (validation) {
                                const resultValidation = validation(val);
                                if (!resultValidation) {
                                    errors.push([key, errorsFieldValidations[key]]);
                                }
                                continue;
                            }
                        }

                        return Object.fromEntries(errors);
                    }}
                    onSubmit={(
                        {namecompany, eslogan, description, phone},
                        {setSubmitting, ...args}
                    ) => {
                        console.log(args);
                        const modifiedFields = {};
                        const arrayFields = Object.entries({namecompany, eslogan, description, phone});
                        
                        //? Clear values modified
                        for(let [key,val] of arrayFields){
                            const areEquals = user[key] === val;
                            if(!areEquals){
                                modifiedFields[key] = val;
                                continue;
                            }
                        }

                        //! If doesn't exist fields to modify
                        const existValuesToModify = !Object.entries(modifiedFields).length;
                        if(existValuesToModify){
                            changeStatusRequest(null, 'No hay valores para modificar');
                            setSubmitting(false);
                            return;
                        }
                        
                        //? Generate request
                        updateBasicUserDataRequest({session: userSession}, modifiedFields)
                            .then(({data}) => {
                                //* If the request will be successfully
                                if(data.userUpdated){
                                    changeStatusRequest(
                                        'success',
                                        'Tus datos han sido actualizados satisfactoriamente'
                                    )
                                    setTimeout(() => {
                                        callback();
                                    }, 3000);
                                    return;
                                }
                            })
                            .catch(() => {
                                changeStatusRequest(null, 'Ha habido un problema inesperado, intentalo más tarde');
                            })
                            .finally(() => {
                                setSubmitting(false);
                            });
                    }}
                >
                    {({ handleSubmit, handleChange, isSubmitting, values, errors}) => (
                        <form
                            className="space-y-2 [&>label>input]:bg-stone-200"
                            onSubmit={handleSubmit}
                        >
                            <label className="block w-full">
                                <p className="pb-2 pl-1 font-bold">Compañía</p>
                                <input
                                    type="text"
                                    name="namecompany"
                                    onChange={handleChange}
                                    value={values.namecompany}
                                    placeholder="Nombre de compañía"
                                />
                                <div className="text-sm">
                                    {
                                        errors.namecompany && <Message msg={errors.namecompany} type={typeMessages.ERROR} />
                                    }
                                </div>
                            </label>
                            <label className="block w-full">
                                <p className="pb-2 pl-1 font-bold">Lema empresarial</p>
                                <input
                                    type="text"
                                    name="eslogan"
                                    onChange={handleChange}
                                    value={values.eslogan}
                                    placeholder="Impacta con tu eslogan!"
                                />
                                <div className="text-sm">
                                    {
                                        errors.eslogan && <Message msg={errors.eslogan} type={typeMessages.ERROR} />
                                    }
                                </div>
                            </label>
                            <label className="block w-full">
                                <p className="pb-2 pl-1 font-bold">Descripción</p>
                                <textarea
                                    name="description"
                                    onChange={handleChange}
                                    value={values.description}
                                    placeholder="Describe la Esencia de tu compañía..."
                                ></textarea>
                                <div className="text-sm">
                                    {
                                        errors.description && <Message msg={errors.description} type={typeMessages.ERROR} />
                                    }
                                </div>
                            </label>
                            <label className="block w-full">
                                <p className="pb-2 pl-1 font-bold">Contacto</p>
                                <input
                                    type="number"
                                    name="phone"
                                    onChange={handleChange}
                                    value={values.phone}
                                    className="rounded-md"
                                    placeholder='Ej: (+57)3202999999'
                                />
                                <div className="text-sm">
                                    {
                                        errors.phone && <Message msg={errors.phone} type={typeMessages.ERROR} />
                                    }
                                </div>
                            </label>
                            {
                                statusRequestForm.type &&
                                    <div className="text-center bg-gradient-to-br from-stone-200 to-stone-100 rounded-full px-10 pb-2 w-fit shadow-lg mx-auto">
                                        <Message
                                            msg={statusRequestForm.msg}
                                            type={statusRequestForm.type}
                                        />       
                                    </div>
                            }
                            {
                                isSubmitting ?
                                    <div className="text-right pr-14 pt-6 pb-2">
                                        <Loader />
                                    </div>
                                    : <div className="w-full text-right [&>button]:bg-blue-500 [&>button]:text-white [&>button]:font-black">
                                        <button
                                            type="submit"
                                            className="btn_base btn_base_hover before:bg-transparent"
                                        >Guardar Cambios</button>
                                    </div>
                            }
                        </form>
                    )}
                </Formik>
    )
}

export default ProfileForm