import { IconContext } from 'react-icons/lib';
import { MdAdd } from 'react-icons/md';
import { IoFilter } from 'react-icons/io5';
import useSessionUserStore from '../../stores/useSessionUserStore';
import ListCategories from '../../components/UserSession/ListCategories';

const CategoriesUser = () => {
    const userCategories = useSessionUserStore(({userCategories}) => userCategories);

    return (
        <div className="space-y-6">
            <div className="px-6 py-2 bg-white rounded-md">
                <h1 className="font-black text-xl">Mis Categorías</h1>
            </div>
            <div className="px-6 py-2 bg-white rounded-md">
                <IconContext.Provider value={{size: '25px'}}>
                    <div className="flex justify-between">
                        <button className="btn_base px-6 flex items-center gap-2">
                            Ordenar
                            <IoFilter />
                        </button>
                        <button className="btn_base hover:scale-105 transition duration-200 ease-out px-6 bg-green-500 text-white font-black flex items-center [&>svg]: justify-center gap-2">
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
                            :   <ListCategories userCategories={userCategories} />
                    }
                </div>
            </div>
        </div>
    );
};

export default CategoriesUser;