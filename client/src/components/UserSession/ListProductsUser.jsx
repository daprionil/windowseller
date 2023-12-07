import ProductCard from './ProductCard';

const ListProductsUser = ({userProducts}) => {
    return (
        <div className='space-y-2'>
            {
                userProducts.length ? userProducts.map((product, idx) => (
                    <ProductCard {...product} key={idx}/>
                ))
                    : <p>No hay productos</p>
            }
        </div>
    )
}

export default ListProductsUser