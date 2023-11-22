import { Link, NavLink } from 'react-router-dom';
import WindowSellerIcon from '../WindowSellerIcon.jsx';
import LogOutButton from './LogOutButton.jsx';

const HeaderUserAccount = () => {
    const activeRouteNavLink = ({isActive}) => (
        isActive ?  'bg-stone-400' : 'bg-stone-300'
    );

    return (
        <header className="bg-stone-200 shadow-lg h-full text-center">
            <div className='p-4 border-b-2 border-stone-300 mb-3'>
                <Link to='/account'>
                    <WindowSellerIcon />
                </Link>
            </div>
            <div>
                <nav>
                    <ul className='flex flex-col [&>a]:p-2 [&>a]:transition [&>a]:duration-200 [&>a]:ease-out [&>a]:font-bold [&>a:hover]:bg-stone-400 [&>a]:w-full [&>a[checked]]:bg-stone-300 pl-3 [&>a]:rounded-l-full gap-2 '>
                        <NavLink to='profile' className={activeRouteNavLink}>
                            <li>
                                Perfil
                            </li>
                        </NavLink>
                        <NavLink to='profil' className={activeRouteNavLink}>
                            <li>
                                Categorías
                            </li>
                        </NavLink>
                        <NavLink to='profil' className={activeRouteNavLink}>
                            <li>
                                Productos
                            </li>
                        </NavLink>
                        <NavLink to='profil' className={activeRouteNavLink}>
                            <li>
                                Catálogos
                            </li>
                        </NavLink>
                        <NavLink to='profil' className={activeRouteNavLink}>
                            <li>
                                Temas
                            </li>
                        </NavLink>
                        <NavLink to='profil' className={activeRouteNavLink}>
                            <li>
                                Configuración
                            </li>
                        </NavLink>
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