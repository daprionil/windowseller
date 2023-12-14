import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import formatPrice from '../../utils/formatPrice';

const ProductCard = ({ id, image, price, description, name, createdAt }) => {
    const idProductPath = Number(
        id.toString() + ((new Date(createdAt)).getTime().toString())
    ).toString(16);
    
    return (
        <div
            className='grid bg-white rounded-lg overflow-hidden grid-cols-1 sm:grid-cols-12 group '
        >
            <div className='col-span-4 h-full max-h-[205px] md:col-span-3 shadow'>
                <img
                    className='object-cover w-full h-full md:h-52'
                    src={image}
                    alt={`window_seller_${name}`}
                />
            </div>
            <div className='px-4 py-2 col-span-5 md:col-span-6'>
                <p className='font-black'>{name}</p>
                <p><span className='font-bold'>Descripción: </span>{description}</p>
                <p><span className='font-bold'>Fecha: </span>{formatDate(createdAt)}</p>
                <p><span className='font-bold'>Precio: </span>{formatPrice(price)}</p>
            </div>
            <div className='px-4 py-2 col-span-3 flex items-center justify-center'>
                <Link to={`/account/products/${idProductPath}`} className='btn_base btn_base_hover bg-blue-400 text-white font-black group-hover:opacity-100 transition-all duration-300 opacity-10 text-center'>
                    Ver Detalles
                </Link>
            </div>
        </div>
    )
}

export default ProductCard