import { Formik } from "formik";

import useCategoriesUserStore from '../../stores/useCategoriesUserStore.js';
import Swal from "sweetalert2";
import { toast } from "../../config/showAlert.js";
import Message, { typeMessages } from "../Message.jsx";
import { fieldValidations } from "../../utils/formValidations.js";

const FormCreateCategory = () => {
    const { createCategoryUser } = useCategoriesUserStore(({ createCategoryUser }) => ({createCategoryUser}));

    return (
        <Formik
            initialValues={{
                categoryname: ''
            }}
            validate={({ categoryname }) => {
                if (fieldValidations.categoryname(categoryname)) {
                    return {
                        categoryname: 'El nombre de categoría no cuenta con los carácteres admitidos [4-20]'
                    };
                }
                return {}
            }}
            onSubmit={({ categoryname }, { resetForm, setSubmitting }) => {
                setSubmitting(true)
                //! Create category with the values form
                createCategoryUser({ categoryname })
                    .then(() => {
                        Swal.close();
                        //? Display toast
                        toast.fire({
                            icon: 'success',
                            title: 'Categoría Creada'
                        })
                        resetForm();
                    })
                    .catch((error) => {
                        console.log(error);
                        //? Display toast
                        toast.fire({
                            icon: 'error',
                            title: 'Ha habido un problema',
                            text: 'No se ha creado la categoría'
                        });
                    })
                    .finally(() => {
                        setSubmitting(false)
                    })

            }}
        >
            {({ values, handleChange, handleSubmit, errors, isSubmitting }) => (
                <form
                    onSubmit={handleSubmit}
                    className='space-y-4 px-2 py-6 [&>button[type="submit"]]:shadow-lg [&>button[type="submit"]]:bg-blue-500'
                >
                    <p className='font-black text-3xl'>Crea una categoría</p>
                    <input
                        className='border-none shadow-lg'
                        type="text"
                        name="categoryname"
                        placeholder='Nombre de Categoría'
                        value={values.categoryname}
                        onChange={handleChange}
                    />
                    <div className="text-sm">
                        {
                            errors.categoryname && <Message msg={errors.categoryname} type={typeMessages.ERROR} />
                        }
                    </div>
                    <button
                        className='text-white hover:scale-105 duration-200 ease-out transition font-black btn_base'
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Agregar
                    </button>
                </form>
            )}
        </Formik>
    )
}

export default FormCreateCategory