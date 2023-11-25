import { useNavigate } from "react-router-dom";

const LogInButton = () => {
    const navigate = useNavigate();

    const handleClickButton = () => {
        navigate('/log-in');
    }

    return (
        <button
            className="btn_base btn_base_hover bg-stone-100 font-black"
            onClick={handleClickButton}
        >
            Iniciar Sesión
        </button>
    )
}

export default LogInButton;