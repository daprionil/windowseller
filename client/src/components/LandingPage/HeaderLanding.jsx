import LogInButton from "../LogInButton"
import SignInButton from '../SignInButton';
import { NavLink } from 'react-router-dom';
import WindowSellerIcon from "../WindowSellerIcon";

const HeaderLanding = () => {
    return (
        <header className="flex items-center justify-between lg:justify-around p-2 bg-yellow-400 shadow-md">
            <div className="pl-3">
                <WindowSellerIcon />
            </div>
            <div>
                <nav>
                    <ul className="flex items-center flex-nowrap space-x-3 font-semibold">
                        <li>
                            <NavLink to='/' className={({isActive}) => isActive ? 'underline' : 'no-underline'}>
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <SignInButton />
                        </li>
                        <li>
                            <LogInButton />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default HeaderLanding