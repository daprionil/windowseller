import { Link, NavLink } from 'react-router-dom';
import WindowSellerIcon from '../WindowSellerIcon.jsx';
import LogOutButton from './LogOutButton.jsx';

const HeaderUserAccount = () => {
    const activeRouteNavLink = ({isActive}) => (
        isActive ?  'text-stone-400' : 'text-stone-00'
    );

    return (
        <header className="p-2 flex flex-nowrap justify-between bg-yellow-500 lg:justify-around items-center">
            <div className='p-1'>
                <Link to='/account'>
                    <WindowSellerIcon />
                </Link>
            </div>
            <div className='p-1'>
                <nav>
                    <ul className='flex flex-nowrap gap-4 items-center font-bold'>
                        <li>
                            <NavLink to='profile' className={activeRouteNavLink}>Perfil</NavLink>
                        </li>
                        <li>
                            <LogOutButton />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default HeaderUserAccount;