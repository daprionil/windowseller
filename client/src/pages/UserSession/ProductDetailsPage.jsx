import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSessionUserStore from '../../stores/useSessionUserStore';
import getAProductRequest from '../../handlers/getAProductRequest';
import useGetProductByUser from '../../hooks/useGetProductByUser';


const ProductDetailsPage = () => {
    const { productId } = useParams();
    const [ loading, product ] = useGetProductByUser(productId);
    useEffect(() => {
        const idProduct = parseInt(productId, 16).toString()[0];
        getAProductRequest({usersession, productId: idProduct})
            .then(console.log)
            .catch(console.log)
            .finally();
    }, []);

    return (
        <div>ProductDetailsPage</div>
    )
}

export default ProductDetailsPage