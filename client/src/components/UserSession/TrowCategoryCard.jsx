import { Formik } from 'formik';
import { useState } from 'react';
import { CiSquareRemove, CiEdit } from 'react-icons/ci';
import useSessionUserStore from '../../stores/useSessionUserStore';
import showAlert, { toast } from '../../config/showAlert';
import { fieldValidations } from '../../utils/formValidations';
import Message, { typeMessages } from '../Message';

const TrowCategoryCard = ({ category, id }) => {
    const [editMode, setEditMode] = useState(false);
    const { deleteCategoryUser, updateCategoryUser } = useSessionUserStore(
        ({ deleteCategoryUser,updateCategoryUser }) => ({
            deleteCategoryUser,
            updateCategoryUser
        })
    );

    const handleEditMode = () => setEditMode(state => !state);
    const handleDeleteCategory = async () => {
        const alert = await showAlert.fire({
            icon: 'question',
            title: '¿Estás seguro de Eliminar esta categoría?',
            text: 'Eliminar esta categoría limpiará de todos los productos y catálogos',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
            confirmButtonColor: 'blue',
        });

        if (alert.isConfirmed) {
            //? Start to delete the category
            deleteCategoryUser({ categoryId: id })
                .then(() => {
                    //? Display toast
                    toast.fire({
                        icon: 'success',
                        title: 'Acción satisfactoria',
                        text: 'Categoría eliminada correctamente'
                    })
                })
                .catch(() => {
                    //? Display toast
                    toast.fire({
                        title: 'Ha habido un problema',
                        text: 'No se ha eliminado la categoría',
                        icon: 'error'
                    })
                });
        }
    }

    return (
        <tr>
            <th>
                {
                    editMode ?
                        <Formik
                            initialValues={{
                                categoryname: category
                            }}
                            validate={({categoryname}) => {
                                if (fieldValidations.categoryname(categoryname)) {
                                    return {
                                        categoryname: 'Valor de nombre de categoría inválido'
                                    };
                                }
                            }}
                            onSubmit={({categoryname}, {setSubmitting})=> {
                                setSubmitting(true);
                                updateCategoryUser({categoryName:categoryname, categoryId: id})
                                    .then(() => {
                                        toast.fire({
                                            icon: "success",
                                            title: 'Categoría actualizada Exitosamente'
                                        })
                                        handleEditMode();
                                    })
                                    .catch(() => {
                                        toast.fire({
                                            icon: "error",
                                            title: 'Ha habido un error',
                                            text: 'La Categoría no se ha actualizado'
                                        })
                                    })
                                    .finally(() => {
                                        setSubmitting(false);
                                    })
                            }}
                        >
                            {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
                                <form
                                    className='flex flex-col pb-2 md:flex-row items-center gap-2 pl-4 [&>input[type="text"]]:outline-none [&>input[type="text"]]:text-stone-500 [&>input[type="text"]]:border-b-2 [&>input[type="text"]]:border-slate-500 [&>input[type="text"]]:bg-transparent [&>input[type="submit"]]:bg-slate-500 [&>input[type="submit"]]:rounded-md [&>input[type="submit"]]:h-fit'
                                    onSubmit={handleSubmit}
                                >
                                    <div className="flex flex-col items-center pt-2 justify-center">
                                        <input
                                            type="text"
                                            name="categoryname"
                                            value={values.categoryname}
                                            onChange={handleChange}
                                            placeholder='Nombre Categoría'
                                        />
                                        {
                                            errors.categoryname &&
                                            <div className="text-sm">
                                                <Message msg={errors.categoryname} type={typeMessages.ERROR} />
                                            </div>
                                        }
                                    </div>
                                    <input
                                        className='text-sm p-2 text-white cursor-pointer'
                                        disabled={isSubmitting}
                                        type="submit"
                                        value="Guardar"
                                    />
                                </form>
                            )}
                        </Formik>
                        : category
                }
            </th>
            <th>0</th>
            <th>0</th>
            <th className="flex items-center justify-center gap-2 text-white p-2">
                <button
                    className="px-2 shadow py-1 hover:scale-[105%] duration-200 transition ease-in rounded-md bg-red-500 text-white"
                    onClick={handleDeleteCategory}
                >
                    <CiSquareRemove />
                </button>
                <button
                    className="px-2 shadow py-1 hover:scale-[105%] duration-200 transition ease-in rounded-md bg-cyan-400"
                    onClick={handleEditMode}
                >
                    <CiEdit />
                </button>
            </th>
        </tr>
    )
}

export default TrowCategoryCard