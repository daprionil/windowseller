import { Formik } from 'formik';
import { useState } from 'react';
import { CiSquareRemove, CiEdit } from 'react-icons/ci';

const TrowCategoryCard = ({category}) => {
    const [ editMode, setEditMode ] = useState(false);

    const handleEditMode = () => setEditMode(state => !state);

    return (
        <tr>
            <th>
                {
                    editMode ?
                        <Formik
                            initialValues={{
                                category
                            }}
                        >
                            {({values, handleChange, handleSubmit}) => (
                                <form
                                    className='flex flex-col pb-2 md:flex-row items-center gap-2 pl-4 [&>input[type="text"]]:outline-none [&>input[type="text"]]:text-stone-500 [&>input[type="text"]]:border-b-2 [&>input[type="text"]]:border-slate-500 [&>input[type="text"]]:bg-transparent [&>input[type="submit"]]:bg-slate-500 [&>input[type="submit"]]:rounded-md [&>input[type="submit"]]:h-fit'
                                    onSubmit={handleSubmit}
                                >
                                    <input
                                        type="text"
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        placeholder='Nombre Categoría'
                                    />
                                    <input
                                        className='text-sm p-2 text-white cursor-pointer'
                                        type="submit"
                                        value="Guardar"
                                    />
                                </form>
                            )}
                        </Formik>
                        :   category
                }
            </th>
            <th>0</th>
            <th>0</th>
            <th className="flex items-center justify-center gap-2 text-white p-2">
                <button
                    className="px-2 shadow py-1 hover:scale-[105%] duration-200 transition ease-in rounded-md bg-red-500 text-white"
                >
                    <CiSquareRemove/>
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