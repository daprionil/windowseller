import { Formik } from "formik"

import Message, { typeMessages } from "../Message.jsx";
import { errorsFieldValidations, fieldValidations, nameFields } from "../../utils/formValidations";
import Loader from "../Loader";

const ProfileForm = ({namecompany,eslogan,description,email,phone}) => {
    return (
        <Formik
            initialValues={{
                namecompany,
                eslogan,
                description,
                phone,
            }}
            validate={(values) => {
                let errors = [];
                const listValues = Object.entries(values);
                for(let [key,val] of listValues){
                    const currentValue = (val + '').trim();
                    if(!currentValue){
                        errors.push([key,`${nameFields[key]} no puede estar vacío`]);
                        continue;
                    }
                    if(currentValue.length < 8){
                        errors.push([key,`${nameFields[key]} debe contener más de 8 carácteres`]);
                        continue;
                    }
                    const validation = fieldValidations[key];
                    if(validation){
                        const resultValidation = validation(val);
                        if(!resultValidation){
                            errors.push([key, errorsFieldValidations[key]]);
                        }
                        continue;
                    }
                }

                return Object.fromEntries(errors);
            }}
            onSubmit={(data) => {
                console.log(data);
            }}
        >
            {({handleSubmit, handleChange, isSubmitting, values, errors}) => (
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
                        isSubmitting ?
                            <div className="text-right pr-14 pt-6 pb-2">
                                <Loader />
                            </div>
                        :   <div className="w-full text-right [&>button]:bg-blue-500 [&>button]:text-white [&>button]:font-black">
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