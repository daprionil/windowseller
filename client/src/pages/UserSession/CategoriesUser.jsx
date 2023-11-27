import { IconContext } from 'react-icons/lib';
import { MdAdd } from 'react-icons/md';
import { IoFilter } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { Formik } from 'formik';

import useSessionUserStore from '../../stores/useSessionUserStore';
import ListCategories from '../../components/UserSession/ListCategories';
import showAlert from '../../config/showAlert';
import Message, { typeMessages } from '../../components/Message';

const CategoriesUser = () => {
    const { userCategories, setCategoryUser } = useSessionUserStore(
        ({ userCategories, setCategoryUser }) => ({
            userCategories,
            setCategoryUser
        })
    );

    const handleClickCreateCategory = () => {
        //! Create module to swal the toast
        const toast = showAlert.mixin({
            toast: true,
            position: 'top-start',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: ( toast ) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        showAlert.fire({
            title: 'Crea una categoría',
            html: (
                <Formik
                    initialValues={{
                        categoryname: ''
                    }}
                    validate={({categoryname}) => {
                        if(!categoryname || categoryname.length < 4 || categoryname.length > 20){
                            return {
                                categoryname: 'El nombre de categoría no está en los carácteres admitidos [4-20]'
                            };
                        };
                        return {}
                    }}
                    onSubmit={({categoryname},{resetForm, setFieldError, setSubmitting}) => {
                        setSubmitting(true)
                        setCategoryUser({categoryname})
                            .then(() => {
                                Swal.close();
                                //! Create module to swal the toast
                                toast.fire({
                                    icon: 'success',
                                    title: 'Categoría Creada'
                                })
                            })
                            .catch(console.log)
                            .finally(() => {
                                setSubmitting(false)
                            })
                            
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors, isSubmitting }) => (
                        <form
                            onSubmit={handleSubmit}
                            className='space-y-4 [&>button[type="submit"]]:shadow-lg [&>button[type="submit"]]:bg-blue-500'
                        >
                            <input
                                className='outline-none shadow-lg'
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
                                className='text-white font-black btn_base'
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Agregar
                            </button>
                        </form>
                    )}
                </Formik>
            ),
            showConfirmButton: false,
        })
    };

    return (
        <div className="space-y-6">
            <div className="px-6 py-2 bg-white rounded-md">
                <h1 className="font-black text-xl">Mis Categorías</h1>
            </div>
            <div className="px-6 py-2 bg-white rounded-md">
                <IconContext.Provider value={{ size: '25px' }}>
                    <div className="flex justify-between">
                        <button className="btn_base px-6 flex items-center gap-2">
                            Ordenar
                            <IoFilter />
                        </button>
                        <button
                            className="btn_base hover:scale-105 transition duration-200 ease-out px-6 bg-green-500 text-white font-black flex items-center [&>svg]: justify-center gap-2"
                            onClick={handleClickCreateCategory}
                        >
                            <MdAdd /> Crear
                        </button>
                    </div>
                </IconContext.Provider>
                <div className='py-6 flex flex-col gap-2'>
                    {
                        userCategories?.error ?
                            <p>{userCategories.error}</p>
                            : !userCategories.length ?
                                <div className='text-center text-lg'>
                                    <p className='underline'>Aún <span className='font-black'>no</span> tienes categorías</p>
                                </div>
                                : <ListCategories userCategories={userCategories} />
                    }
                </div>
            </div>
        </div>
    );
};

export default CategoriesUser;