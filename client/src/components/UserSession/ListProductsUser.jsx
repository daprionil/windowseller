import useProductUserStore from '../../stores/useProductUserStore';
import ProductCard from './ProductCard';

const ListProductsUser = ({ handleCreateProduct, userProductsProps }) => {
    const userProducts = useProductUserStore(({ userProducts }) => userProducts);

    return (
        <div className='space-y-2'>
            {
                (userProductsProps ?? userProducts).length ?
                    (userProductsProps ?? userProducts).map((product, idx) => (
                        <ProductCard {...product} key={idx} />
                    ))
                    : <div className='bg-white shadow-md rounded-md text-center px-10 pt-10 pb-8 space-y-2'>
                        <p className='font-black text-2xl'>¡ No hay <span className='text-slate-400'>Productos !</span></p>
                        <p className='underline'>Crea productos y compartelos en tus catálogos</p>
                        <button
                            className='btn_base shadow bg-green-500 text-white font-bold btn_base_hover'
                            onClick={handleCreateProduct}
                        >
                            Crear Producto
                        </button>
                    </div>
            }
        </div>
    )
}

export default ListProductsUser