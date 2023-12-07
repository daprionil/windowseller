import { GrUpdate } from 'react-icons/gr';
import { RxReset } from 'react-icons/rx';
import { FaRegTrashCan } from 'react-icons/fa6';
import { MdFilterAlt } from 'react-icons/md';

import useProductUserStore from "../stores/useProductUserStore";
import { Link } from 'react-router-dom';
import formatDate from '../utils/formatDate';

const ProductsPage = () => {
    const userProducts = useProductUserStore(({userProducts}) => userProducts);
    console.log(userProducts);

    return (
        <div className="space-y-3">
            <div className="px-6 py-2 bg-white rounded-md">
                <h1 className="font-black text-xl">Mis productos</h1>
            </div>
            <div className="py-2 grid grid-cols-12 gap-4">
                <div className="col-span-9">
                    {/* Generate funcionality to filter the products by name */}
                    <div className="rounded-lg overflow-hidden shadow flex bg-white">
                        <input
                            type="search"
                            placeholder="Busca entre tus productos"
                            className=" w-full p-2 h-full focus:outline-none placeholder:font-bold font-bold outline-none border-none"
                            name="searchValueProduct"
                        />
                        <button className="bg-slate-100 [&>svg]:transition [&>svg]:duration-200 [&>svg]:transform [&:hover>svg]:scale-110  px-4">
                            <RxReset/>
                        </button>
                    </div>
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
            </div>
            <div className='space-y-2'>
                {
                    userProducts.map(({id, price, description, name, createdAt}, idx) =>{
                        const idProductPath = Number(
                            id.toString() + ((new Date(createdAt)).getTime().toString())
                        ).toString(16);

                        return (
                            <div
                                key={idx}
                                className='grid bg-white rounded-lg overflow-hidden grid-cols-12 group'
                            >
                                <div className='px-4 py-2 col-span-3 bg-red-500'>
    
                                </div>
                                <div className='px-4 py-2 col-span-6'>
                                    <p className='font-black'>{name}</p>
                                    <p><span className='font-bold'>Descripción: </span>{description}</p>
                                    <p><span className='font-bold'>Fecha: </span>{formatDate(createdAt)}</p>
                                    <p><span className='font-bold'>Precio: </span>{price}</p>
                                </div>
                                <div className='px-4 py-2 col-span-3 flex items-center justify-center'>
                                    <Link to={`/account/products/${idProductPath}`} className='btn_base btn_base_hover bg-blue-400 text-white font-black group-hover:opacity-100 transition-all duration-300 opacity-0'>
                                        Ver Detalles
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                    )
                }
            </div>
        </div>
    );
};

export default ProductsPage;