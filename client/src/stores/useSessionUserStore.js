import { create } from 'zustand';
import getAllCategoriesRequest from '../handlers/getAllCategoriesRequest';

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

//?  Store to manage the user info
const useSessionUserStore = create((set, get) => ({
    usersession: getUserSessionStorage() ?? false,
    user: null,
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
    userCategories: [],
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
            }}))
        }
    },
}));

export default useSessionUserStore;