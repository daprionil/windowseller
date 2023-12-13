import { GrUpdate } from 'react-icons/gr';
import { FaRegTrashCan } from 'react-icons/fa6';
import { MdFilterAlt, MdLibraryAdd } from 'react-icons/md';

import ListProductsUser from '../components/UserSession/ListProductsUser';
import SearchBar from '../components/SearchBar';
import showAlert from '../config/showAlert';
import FormCreateProduct from '../components/UserSession/FormCreateProduct';

const ProductsPage = () => {
    const handleCreateProduct = () => {
        showAlert.fire({
            html: <FormCreateProduct />,
            showConfirmButton: false,
        })
    };

    return (
        <div className="space-y-3">
            <div className="px-6 py-2 bg-white rounded-md">
                <h1 className="font-black text-xl">Mis productos</h1>
            </div>
            <div className="py-2 grid grid-cols-8 md:grid-cols-12 gap-4">
                <div className="col-span-8">
                    {/* Generate funcionality to filter the products by name */}
                    <SearchBar />
                </div>
                <div className=" w-full col-span-2 md:col-span-1 h-full">
                    <button className=" [&>svg]:inline-block w-full md:w-auto btn_base bg-white drop-shadow-md gap-4 h-full">
                        <MdFilterAlt />
                        <p className=' md:hidden text-sm hidden pl-2 sm:inline-block font-bold'>Filtros</p>
                    </button>
                </div>
                <div className=" w-full col-span-2 md:col-span-1 h-full">
                    <button className=" [&>svg]:inline-block w-full md:w-auto btn_base h-full bg-cyan-600 gap-4 text-white drop-shadow-md">
                        <GrUpdate />
                        <p className=' md:hidden text-sm hidden pl-2 sm:inline-block text-white font-bold '>Actualizar</p>
                    </button>
                </div>
                <div className=" w-full col-span-2 md:col-span-1 h-full">
                    <button className=" [&>svg]:inline-block w-full md:w-auto btn_base bg-blue-600 text-white gap-4 drop-shadow-md h-full">
                        <FaRegTrashCan />
                        <p className=' md:hidden text-sm hidden pl-2 sm:inline-block text-white font-bold '>Papelera</p>
                    </button>
                </div>
                <div className=" w-full col-span-2 md:col-span-1 h-full">
                    <button
                        className=" [&>svg]:inline-block w-full md:w-auto btn_base bg-green-600 text-white gap-4 drop-shadow-md h-full"
                        onClick={handleCreateProduct}
                    >
                        <MdLibraryAdd />
                        <p className=' md:hidden text-sm hidden pl-2 sm:inline-block text-white font-bold '>Agregar</p>
                    </button>
                </div>
            </div>
            <ListProductsUser handleCreateProduct={handleCreateProduct}/>
        </div>
    );
};

export default ProductsPage;