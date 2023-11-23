import { useNavigate } from "react-router-dom";

const SignInButton = () => {
    const navigate = useNavigate();

    const handleClickButton = () => {
        navigate('/sign-in');
    };

    return (
        <button
            className="btn_base btn_base_hover bg-thirdyellow text-white font-black"
            onClick={handleClickButton}
        >
            Registrarse
        </button>
    )
};

export default SignInButton;