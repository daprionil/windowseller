import { useEffect, useState } from "react";
import useSessionUserStore from "../stores/useSessionUserStore";
import getAProductRequest from "../handlers/getAProductRequest";

const useGetProductByUser = (productId) => {
    const usersession = useSessionUserStore(({usersession}) => usersession);
    const [loading , setLoading] = useState(true);
    const [product , setProduct] = useState(null);

    useEffect(() => {
        const idProduct = parseInt(productId, 16).toString()[0];
        getAProductRequest({usersession, productId: idProduct})
            .then((data) => {
                console.log(data);
                setLoading(false);
            })
            .catch(() => {
                setProduct({
                    error: 'No ha sido posible recuperar el Producto'
                })
                setLoading(false);
            });
    }, []);

    return [
        loading,
        product
    ]
};

export default useGetProductByUser