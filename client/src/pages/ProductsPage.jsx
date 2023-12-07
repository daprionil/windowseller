import { GrUpdate } from 'react-icons/gr';
import { FaRegTrashCan } from 'react-icons/fa6';
import { MdFilterAlt, MdLibraryAdd } from 'react-icons/md';

import useProductUserStore from "../stores/useProductUserStore";
import ListProductsUser from '../components/UserSession/ListProductsUser';
import SearchBar from '../components/SearchBar';

const ProductsPage = () => {
    const userProducts = useProductUserStore(({ userProducts }) => userProducts);

    return (
        <div className="space-y-3">
            <div className="px-6 py-2 bg-white rounded-md">
                <h1 className="font-black text-xl">Mis productos</h1>
            </div>
            <div className="py-2 grid grid-cols-12 gap-4">
                <div className="col-span-8">
                    {/* Generate funcionality to filter the products by name */}
                    <SearchBar />
                </div>
                <div className="col-span-1 h-full">
                    <button className="btn_base bg-white drop-shadow-md h-full">
                        <MdFilterAlt />
                    </button>
                </div>
                <div className="col-span-1 h-full">
                    <button className="btn_base h-full bg-cyan-600 text-white drop-shadow-md">
                        <GrUpdate />
                    </button>
                </div>
                <div className="col-span-1 h-full">
                    <button className="btn_base bg-blue-600 text-white drop-shadow-md h-full">
                        <FaRegTrashCan />
                    </button>
                </div>
                <div className="col-span-1 h-full">
                    <button className="btn_base bg-green-600 text-white drop-shadow-md h-full">
                        <MdLibraryAdd />
                    </button>
                </div>
            </div>
            <ListProductsUser userProducts={userProducts} />
        </div>
    );
};

export default ProductsPage;