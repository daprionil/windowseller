import { create } from "zustand";
import useSessionUserStore from "./useSessionUserStore";
import getAllCategoriesRequest from "../handlers/getAllCategoriesRequest";
import createCategoryRequest from "../handlers/createCategoryRequest";
import updateCategoryRequest from "../handlers/updateCategoryRequest";
import deleteCategoryRequest from "../handlers/deleteCategoryRequest";


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


const useCategoriesUserStore = create((set, get) => ({
    userCategories: [],
    getAllCategories: async () => {
        const usersession = useSessionUserStore.getState().usersession;
        if (!usersession) return;
        try {
            const { data } = await getAllCategoriesRequest({ session: usersession });
            if (data.userCategories) {
                set(() => ({ userCategories: data.userCategories }))
            }
        } catch (error) {
            set(() => ({
                userCategories: {
                    error: 'No ha sido posible obtener tus categorías'
                }
            }));
        }
    },
    createCategoryUser: async ({ categoryname }) => {
        const usersession = useSessionUserStore.getState().usersession;

        //? Generate the creation category Request
        const { data } = await createCategoryRequest({ session: usersession, categoryname });

        //! If the category was not created
        if (!data.createdCategory) throw new Error();

        //? Set category created in the store
        set(({ userCategories }) => ({
            userCategories: [data.createdCategory, ...userCategories]
        }));
    },
    deleteCategoryUser: async ({ categoryId }) => {
        const usersession = useSessionUserStore.getState().usersession;

        //? Delete category with the request
        const { data } = await deleteCategoryRequest({
            session: usersession,
            categoryId
        });

        //? If the category was not deleted
        if (!data.deleted) throw new Error();

        //? Delete category in the store
        set(({ userCategories }) => ({
            userCategories: userCategories.filter(({ id }) => id !== categoryId)
        }), false);

        return data;
    },
    updateCategoryUser: async ({ categoryName, categoryId }) => {
        const usersession = useSessionUserStore.getState().usersession;

        //? Update category with the request
        const { data } = await updateCategoryRequest({
            session: usersession,
            categoryName,
            categoryId
        });

        //? If the category was not updated
        if (!data.updatedCategory) throw new Error();

        //? Update category in the store
        set(({ userCategories }) => ({
            userCategories: userCategories.map((category) => {
                if (category.id === data.updatedCategory.id) {
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
                return categories.sort(({ catalogs: cA = 0 }, { catalogs: cB = 0 }) => {
                    return cA.length - cB.length;
                });
            },
            [typeOrders.countUpCatalogs]: (categories = []) => {
                return categories.sort(({ catalogs: cA = 0 }, { catalogs: cB = 0 }) => {
                    return cB.length - cA.length;
                });
            },
            [typeOrders.countDownProducts]: (categories = []) => {
                return categories.sort(({ products: pA = 0 }, { products: pB = 0 }) => {
                    return pA.length - pB.length;
                });
            },
            [typeOrders.countUpProducts]: (categories = []) => {
                return categories.sort(({ products: pA = 0 }, { products: pB = 0 }) => {
                    return pB.length - pA.length;
                });
            },
            [typeOrders.downCreated]: (categories = []) => {
                return categories.sort(({ createdAt: a }, { createdAt: b }) => {
                    const aDateTime = (new Date(a)).getTime();
                    const bDateTime = (new Date(b)).getTime();
                    return bDateTime - aDateTime;
                });
            },
            [typeOrders.upCreaded]: (categories = []) => {
                return categories.sort(({ createdAt: a }, { createdAt: b }) => {
                    const aDateTime = (new Date(a)).getTime();
                    const bDateTime = (new Date(b)).getTime();
                    return aDateTime - bDateTime;
                });
            }
        };

        if (!userCategories.length) return;
        set(({ userCategories }) => ({
            userCategories: typeOrdersFunctions[typeOrder](userCategories)
        }), false);
    }
}));

export default useCategoriesUserStore;
export {
    typeOrders
}