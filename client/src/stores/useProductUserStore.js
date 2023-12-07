import { create } from 'zustand';
import useSessionUserStore from './useSessionUserStore';
import getAllProductsRequest from '../handlers/getAllProductsRequest';

const useProductUserStore = create((set, get) => ({
    userProducts: [],
    removedProducts: [],
    createNewProduct: () => {
        
    },
    getAllProducts: async () => {
        const usersession = useSessionUserStore.getState().usersession;
        
        if(!usersession) return;
        //? Generate request with the usersession in the store
        const response = await getAllProductsRequest({usersession});
        const products = response.data?.productsUser;
        
        //? Filter the arrays
        let arrayRemoved = [], arrayEnabledProducts = [];
        products.forEach(product => {
            const {deleted} = product;
            if(deleted){
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

    }
}));

export default useProductUserStore;