import {create} from 'zustand';
import getUserDataSession from '../handlers/getUserDataSession';

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
    setUserSession: ({sessionToken}) => {
        //! Set session in the store
        setUserSessionStorage(sessionToken);
        set(() => ({usersession: sessionToken}));
    },
    removeUserSession: () => {
        //! Remove session in the store
        removeUserSessionOfStorage();
        set(() => ({usersession: false}));
    },
    getUserBySession:() => {
        const currentUserSession = get().usersession;
        if(currentUserSession){
            return getUserDataSession({session:currentUserSession});
        }
        return null;
    }
}));

export default useSessionUserStore;