import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    
    useEffect(() => {
        const idProduct = parseInt(productId, 16).toString()[0];
        console.log(idProduct);
    }, []);

    return (
        <div>ProductDetailsPage</div>
    )
}

export default ProductDetailsPage