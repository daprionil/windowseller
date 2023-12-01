import { create } from 'zustand';
import getAllCategoriesRequest from '../handlers/getAllCategoriesRequest';
import createCategoryRequest from '../handlers/createCategoryRequest';
import deleteCategoryRequest from '../handlers/deleteCategoryRequest';
import updateCategoryRequest from '../handlers/updateCategoryRequest';

//* Values
const typeOrders = {
    normalOrder: 1,
    countUpProducts: 2,
    countDownProducts: 3,
    countUpCatalogs: 4,
    countDownCatalogs: 5,
    downCreated: 6,
    upCreaded: 7
}

//* Functions
const { VITE_NAME_STORAGE_TOKEN_SESSION } = import.meta.env;
//? Search session user from the storage
const getUserSessionStorage = () => (
    localStorage.getItem(VITE_NAME_STORAGE_TOKEN_SESSION)
);

//? Set session user in the storage
const setUserSessionStorage = (session) => localStorage.setItem(
    VITE_NAME_STORAGE_TOKEN_SESSION,
    session
);

//? Remove user session of storage
const removeUserSessionOfStorage = () => {
    localStorage.removeItem(VITE_NAME_STORAGE_TOKEN_SESSION);
};

//*  Store to manage the user info
const useSessionUserStore = create((set, get) => ({
    usersession: getUserSessionStorage() ?? false,
    user: null,
    userCategories: [],
    setUserSession: ({ sessionToken }) => {
        //! Set session in the store
        setUserSessionStorage(sessionToken);
        set(() => ({ usersession: sessionToken }));
    },
    removeUserSession: () => {
        //! Remove session in the store
        removeUserSessionOfStorage();
        set(() => ({ usersession: false }));
    },
    getAllCategories: async () => {
        const userSession = get().usersession;
        if(!userSession) return;
        try {
            const { data } = await getAllCategoriesRequest({session: userSession});
            if(data.userCategories){
                set(() => ({userCategories: data.userCategories}))
            }
        } catch (error) {
            set(() => ({userCategories: {
                error: 'No ha sido posible obtener tus categorías'
            }}));
        }
    },
    createCategoryUser: async ({categoryname}) => {
        const { usersession } = get();
        
        //? Generate the creation category Request
        const { data } = await createCategoryRequest({session: usersession, categoryname});
        
        //! If the category was not created
        if(!data.createdCategory) throw new Error();

        //? Set category created in the store
        set(({userCategories}) => ({
            userCategories: [data.createdCategory,...userCategories]
        }));
    },
    deleteCategoryUser: async ({categoryId}) => {
        const { usersession } = get();
        
        //? Delete category with the request
        const { data } = await deleteCategoryRequest({
            session: usersession,
            categoryId
        });

        //? If the category was not deleted
        if(!data.deleted) throw new Error();
        
        //? Delete category in the store
        set(({userCategories}) => ({
            userCategories: userCategories.filter(({id}) => id !== categoryId)
        }), false);
        
        return data;
    },
    updateCategoryUser: async ({categoryName, categoryId}) => {
        const { usersession } = get();
        
        //? Update category with the request
        const { data } = await updateCategoryRequest({
            session: usersession,
            categoryName,
            categoryId
        });

        //? If the category was not updated
        if(!data.updatedCategory) throw new Error();
        
        //? Update category in the store
        set(({userCategories}) => ({
            userCategories: userCategories.map((category) => {
                if(category.id === data.updatedCategory.id){
                    return data.updatedCategory;
                }
                return category;
            })
        }), false);
    },
    orderCategories: (typeOrder) => {
        const userCategories = get().userCategories;
        const typeOrdersFunctions = {
            [typeOrders.countDownCatalogs]: (categories = []) => {
                return categories.sort(({catalogs: cA = 0},{catalogs:cB = 0}) => {
                    return cA.length - cB.length;
                });
            },
            [typeOrders.countUpCatalogs]: (categories = []) => {
                return categories.sort(({catalogs: cA = 0},{catalogs:cB = 0}) => {
                    return cB.length - cA.length;
                });
            },
            [typeOrders.countDownProducts]: (categories = []) => {
                return categories.sort(({products: pA = 0},{products:pB = 0}) => {
                    return pA.length - pB.length;
                });
            },
            [typeOrders.countUpProducts]: (categories = []) => {
                return categories.sort(({products: pA = 0},{products:pB = 0}) => {
                    return pB.length - pA.length;
                });
            },
            [typeOrders.downCreated]: (categories = []) => {
                return categories.sort(({createdAt: a},{createdAt: b}) => {
                    const aDateTime = (new Date(a)).getTime();
                    const bDateTime = (new Date(b)).getTime();
                    return bDateTime - aDateTime;
                });
            },
            [typeOrders.upCreaded]: (categories = []) => {
                return categories.sort(({createdAt: a},{createdAt: b}) => {
                    const aDateTime = (new Date(a)).getTime();
                    const bDateTime = (new Date(b)).getTime();
                    return aDateTime - bDateTime;
                });
            }
        };

        if(!userCategories.length) return;
        set(({userCategories}) => ({
            userCategories: typeOrdersFunctions[typeOrder](userCategories)
        }), false);
    }
}));

export default useSessionUserStore;
export {
    typeOrders
}