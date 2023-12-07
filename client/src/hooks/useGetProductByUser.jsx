import { useEffect, useState } from "react";
import useSessionUserStore from "../stores/useSessionUserStore";

const useGetProductByUser = (props) => {
    const usersession = useSessionUserStore(({usersession}) => usersession);
    const [loading , setLoading] = useState();
    const [product , setProduct] = useState();

    console.log(props);

    useEffect(() => {
        const idProduct = parseInt(productId, 16).toString()[0];
        getAProductRequest({usersession, productId: idProduct})
            .then(console.log)
            .catch(console.log)
            .finally();
    }, []);

    return [
        loading,
        product
    ]
}

export default useGetProductByUser