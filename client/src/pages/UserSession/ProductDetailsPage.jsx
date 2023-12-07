import { useParams } from 'react-router-dom';
import useGetProductByUser from '../../hooks/useGetProductByUser';
import Loader from '../../components/Loader';
import Message, { typeMessages } from '../../components/Message';


const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [ loading, product ] = useGetProductByUser(productId);

    return (
        <div>
            {
                loading ?
                    <Loader />
                :   product?.error ?
                        <div className='bg-gradient-oliver p-2 rounded-md text-center'>
                            <Message msg={product.error} type={typeMessages.ERROR} />
                        </div>
                    :   <p>{JSON.stringify(product)}</p>
            }
        </div>
    )
}

export default ProductDetailsPage