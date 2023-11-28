import { IconContext } from 'react-icons/lib';
import { MdAdd } from 'react-icons/md';
import { IoFilter } from 'react-icons/io5';

import ListCategories from '../../components/UserSession/ListCategories';
import showAlert from '../../config/showAlert';
import FormCreateCategory from '../../components/UserSession/FormCreateCategory';
import useSessionUserStore from '../../stores/useSessionUserStore';
import Message, { typeMessages } from '../../components/Message';

const CategoriesUser = () => {
    const userCategories = useSessionUserStore(({ userCategories }) => userCategories);

    const handleClickCreateCategory = () => {
        showAlert.fire({
            html: (
                <FormCreateCategory />
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
                            <div className='text-center pb-2 px-6 mx-auto shadow rounded-md w-fit bg-gradient-oliver'>
                                <Message
                                    msg='Ha habido un error inesperado'
                                    type={typeMessages.ERROR}
                                />
                            </div>
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