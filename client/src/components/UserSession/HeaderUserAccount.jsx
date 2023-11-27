import { Link, NavLink } from 'react-router-dom';
import WindowSellerIcon from '../WindowSellerIcon.jsx';
import LogOutButton from './LogOutButton.jsx';

const HeaderUserAccount = () => {
    const activeRouteNavLink = ({isActive}) => (
        isActive ?  'bg-slate-500 text-white border-r-8 border-white' : 'bg-slate-400'
    );

    return (
        <header className="bg-slate-300 shadow-lg h-full text-center">
            <div className='p-4 border-b-2 border-slate-300 mb-3'>
                <Link to='/account'>
                    <WindowSellerIcon />
                </Link>
            </div>
            <div>
                <nav>
                    <ul className='flex flex-col [&>a]:p-2 [&>a]:transition [&>a]:duration-[1s] [&>a]:ease-out [&>a]:font-bold [&>a]:w-full [&>a[checked]]:bg-slate-300 pl-3 [&>a]:rounded-l-full gap-2 '>
                        <NavLink to='profile' className={activeRouteNavLink}>
                            <li>
                                Perfil
                            </li>
                        </NavLink>
                        <NavLink to='categories' className={activeRouteNavLink}>
                            <li>
                                Categorías
                            </li>
                        </NavLink>
                        <NavLink to=' ' className={activeRouteNavLink}>
                            <li>
                                Productos
                            </li>
                        </NavLink>
                        <NavLink to=' ' className={activeRouteNavLink}>
                            <li>
                                Catálogos
                            </li>
                        </NavLink>
                        <NavLink to=' ' className={activeRouteNavLink}>
                            <li>
                                Temas
                            </li>
                        </NavLink>
                        <NavLink to=' ' className={activeRouteNavLink}>
                            <li>
                                Configuración
                            </li>
                        </NavLink>
                        <li className='[&>button]:text-white [&>button]:before:bg-slate-200 [&>button]:before:bg-opacity-50 [&>button]:bg-red-500'>
                            <LogOutButton />
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default HeaderUserAccount;