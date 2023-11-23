import useSessionUserStore from "../../stores/useSessionUserStore"

const LogOutButton = () => {
    const logOut = useSessionUserStore(({removeUserSession}) => removeUserSession);

    //! Remove the user session
    const handleClick = () => {
        logOut();
    };

    return (
        <button
            className="btn_base before:bg-red-600 btn_base_hover before:bg-opacity-70 font-black bg-white"
            onClick={handleClick}
        >
            Cerrar Sesion
        </button>
    )
}

export default LogOutButton