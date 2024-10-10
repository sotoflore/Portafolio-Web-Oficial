import { NavLink } from 'react-router-dom';
import LogoWebsite from '/src/assets/image-logo.png';
import NavLinkItem from './NavLinkItem';
import {
    HiOutlineHome,
    HiOutlineUserCircle,
    HiOutlineTemplate,
    HiOutlinePhoneOutgoing
} from "react-icons/hi";
import ScrollToTop from '../scrollTo/ScrollToTop'

const NavigationBar = () => {


    return (
        <header>
            <ScrollToTop/>
            <nav className="fixed w-full h-fit z-20 bottom-0 md:top-0 shadow-lg bg-white px-5 xl:px-0">
                <div className="max-w-screen-xl flex items-center justify-between mx-auto py-2">
                    <NavLink to="/" className="hidden md:flex items-center">
                        <img src={LogoWebsite} className="h-16 drop-shadow-lg" alt="logo del sitio web" />
                    </NavLink>
                    <div className="w-full md:w-auto">
                        <ul className="font-medium flex justify-around md:space-x-4">
                            <NavLinkItem to="/" text="Inicio">
                                <HiOutlineHome className='md:text-xl' />
                            </NavLinkItem>
                            <NavLinkItem to="/perfil" text="Perfil">
                                <HiOutlineUserCircle className='md:text-xl' />
                            </NavLinkItem>
                            <NavLinkItem to="/blogs" text="blogs">
                                <HiOutlineTemplate className='md:text-xl' />
                            </NavLinkItem>
                            <NavLinkItem to="/contacto" text="contáctame">
                                <HiOutlinePhoneOutgoing className='md:text-xl' />
                            </NavLinkItem>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
export default NavigationBar;