import { IconContext } from 'react-icons/lib';
import { MdAdd } from 'react-icons/md';
import { IoFilter } from 'react-icons/io5';
import useSessionUserStore from '../../stores/useSessionUserStore';

const CategoriesUser = () => {
    const userCategories = useSessionUserStore(({userCategories}) => userCategories);

    return (
        <div className="space-y-6">
            <div className="px-6 py-2 bg-white rounded-md">
                <h1 className="font-black text-xl">Mis Categorías</h1>
            </div>
            <div className="px-6 py-2 bg-white rounded-md">
                <div className="flex justify-between">
                    <button className="btn_base px-6 flex items-center gap-2">
                        Ordenar
                        <IconContext.Provider value={{size: '25px'}}>
                            <IoFilter />
                        </IconContext.Provider>
                    </button>
                    <button className="btn_base hover:scale-105 transition duration-200 ease-out px-6 bg-green-500 text-white font-black flex items-center [&>svg]: justify-center gap-2">
                        <IconContext.Provider value={{size: '25px'}}>
                            <MdAdd />
                        </IconContext.Provider> Crear
                    </button>
                </div>
                <div className='py-6'>
                    <div className='text-center text-lg'>
                        <p className='underline'>Aún <span className='font-black'>no</span> tienes categorías</p>
                    </div>
                    {
                        JSON.stringify(userCategories)
                    }
                </div>
            </div>
        </div>
    );
};

export default CategoriesUser;