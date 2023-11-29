import { IconContext } from 'react-icons/lib';
import { MdAdd } from 'react-icons/md';

import ListCategories from '../../components/UserSession/ListCategories';
import showAlert from '../../config/showAlert';
import FormCreateCategory from '../../components/UserSession/FormCreateCategory';
import useSessionUserStore from '../../stores/useSessionUserStore';
import Message, { typeMessages } from '../../components/Message';
import { useEffect, useState } from 'react';
import FilterOrderCategories from '../../components/UserSession/FilterOrderCategories';

const CategoriesUser = () => {
    const userCategories = useSessionUserStore(({ userCategories }) => userCategories);
    const [selectedTypeOrder, setSelectedTypeOrder ] = useState(1);

    const handleClickCreateCategory = () => {
        showAlert.fire({
            html: (
                <FormCreateCategory />
            ),
            showConfirmButton: false,
        })
    };

    useEffect(() => {
        console.log(selectedTypeOrder);
    },[selectedTypeOrder]);

    return (
        <div className="space-y-6">
            <div className="px-6 py-2 bg-white rounded-md">
                <h1 className="font-black text-xl">Mis Categorías</h1>
            </div>
            <div className="px-6 py-2 bg-white rounded-md">
                <IconContext.Provider value={{ size: '25px', }}>
                    <div className="flex justify-between">
                        <FilterOrderCategories
                            selectedTypeOrder={selectedTypeOrder}
                            setSelectedTypeOrder={setSelectedTypeOrder}
                        />
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