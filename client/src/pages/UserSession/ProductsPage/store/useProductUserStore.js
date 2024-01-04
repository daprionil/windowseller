import { create } from 'zustand';
import useSessionUserStore from '@/pages/UserSession/ProductsPage/store/useSessionUserStore.js';
import getAllProductsRequest from '@/handlers/getAllProductsRequest';
import createProductRequest from '@/handlers/createProductRequest';

const useProductUserStore = create((set, get) => ({
    userProducts: [],
    removedProducts: [],
    createNewProduct: async (formData) => {
        const usersession = useSessionUserStore.getState().usersession;

        if (!usersession) return;
        //* Send request to create the product
        const { data } = await createProductRequest({ formData, usersession });

        //* If the product was not received
        const productCreated = data.createdProduct;
        if (!productCreated) throw new Error();

        //* If the product was created successfully set in the store
        set(({ userProducts }) => ({
            userProducts: [...userProducts, productCreated]
        }), false);
    },
    getAllProducts: async () => {
        const usersession = useSessionUserStore.getState().usersession;

        if (!usersession) return;
        //? Generate request with the usersession in the store
        const response = await getAllProductsRequest({ usersession });
        const products = response.data?.productsUser;

        //? Filter the arrays
        let arrayRemoved = [], arrayEnabledProducts = [];
        products.forEach(product => {
            const { deleted } = product;
            if (deleted) {
                arrayRemoved.push(product);
                return;
            }
            arrayEnabledProducts.push(product);
        });

        //? Set products in the store
        set(() => ({
            userProducts: arrayEnabledProducts,
            removedProducts: arrayRemoved
        }));
    },
    updateProduct: () => {

    },
    getProduct: () => {

    },
    deleteProducts: () => {

    },
    removeProducts: () => {

    },
}));

export default useProductUserStore;