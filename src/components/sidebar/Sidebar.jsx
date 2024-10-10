import { useEffect, useRef, useState } from "react";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import {
    HiOutlineMail,
    HiOutlineBookOpen,
    HiOutlineViewGridAdd,
    HiOutlineNewspaper,
    HiOutlineUserCircle,
    HiOutlineSun,
    HiOutlineHashtag
} from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import { auth, signOut } from "../../firebase";
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import Swal from "sweetalert2";

const Sidebar = () => {
    const { data: emails } = useFirestoreCollection('emails');
    const { data: perfil } = useFirestoreCollection('perfil');

    const navigation = [
        {
            href: '/access/admin/perfil-admin',
            name: 'Perfil',
            icon: <HiOutlineUserCircle className="w-5 h-5"/>
        },
        {
            href: '/access/admin/list-experience',
            name: 'Experiencia',
            icon: <HiOutlineHashtag className="w-5 h-5" />
        },
        {
            href: '/access/admin/list-education',
            name: 'Educación',
            icon: <HiOutlineBuildingOffice2 className="w-5 h-5" />
        },
        {
            href: '/access/admin/list-knowledge',
            name: 'Conocimientos',
            icon: <HiOutlineSun className="w-5 h-5" />
        },
        {
            href: '/access/admin/list-certification',
            name: 'Certificaciones',
            icon: <HiOutlineNewspaper className="w-5 h-5" />
        },
        {
            href: '/access/admin/list-projects',
            name: 'Proyectos',
            icon: <HiOutlineViewGridAdd className="w-5 h-5" />
        },
        {
            href: '/access/admin/list-blogs',
            name: 'Blogs',
            icon: <HiOutlineBookOpen className="w-5 h-5" />
        }
    ]

    const navsFooter = [
        {
            href: '/access/admin/list-emails',
            name: 'Emails recibidos',
            icon: <HiOutlineMail className="w-5 h-5" />,
            count: emails.length
        }
    ]
    const currentUser = useAuth();
    const profileRef = useRef()

    const [isProfileActive, setIsProfileActive] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const handleProfile = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileActive(false)
        }
        document.addEventListener('click', handleProfile)
    }, [])

    useEffect(() => {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Nuevo correo",
            showConfirmButton: false,
            timer: 1000
        });
    }, [emails]); 

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/authentication/login/user');
    };

    return (
        <>
            <nav className="fixed top-0 left-0 w-full h-full border-r bg-white space-y-8 sm:w-80">
                <div className="flex flex-col h-full px-4">
                    <div className='h-20 flex items-center pl-2'>
                        <div className="w-full flex items-center gap-x-4">
                            {
                                perfil.map((item) => (
                                    <div key={item.id} className="w-full flex items-center gap-2">
                                        <img src={item.imagenUrl} className="w-10 h-10 rounded-full" />
                                        <div>
                                            <span className="block text-gray-800 text-sm font-bold">{item.nombre }</span>
                                            <span className="block mt-px text-gray-600 text-xs">
                                                {item.contacto}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="relative flex-1 text-right">
                                <button ref={profileRef} className="p-1.5 rounded-md text-gray-500 hover:bg-gray-50 active:bg-gray-100"
                                    onClick={() => setIsProfileActive(!isProfileActive)}
                                >
                                    <IoSettingsOutline className="w-5 h-5"/>
                                </button>
                                {
                                    isProfileActive ? (
                                        <div className="absolute z-10 top-12 right-0 w-64 rounded-lg bg-white shadow-md border text-sm text-gray-600">
                                            <div className="p-2 text-left">
                                                <span className="block text-slate-900 font-bold p-2">{currentUser.email}</span>
                                                <button onClick={handleLogout} className="block w-full p-2 bg-red-600 text-slate-200 font-bold text-left rounded-md">
                                                    Cerrar sesión
                                                </button>
                                            </div>
                                        </div>
                                    ) : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className="overflow-auto">
                        <ul className="text-sm font-medium flex-1">
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx} className="mb-1">
                                        <NavLink
                                            to={item.href}
                                            className={({ isActive }) =>
                                                `flex items-center gap-x-2 p-2 rounded-lg duration-150 ${isActive
                                                    ? 'bg-gray-900 text-slate-300'
                                                    : 'text-slate-500 hover:bg-gray-900 hover:text-slate-300'
                                                }`
                                            }
                                        >
                                            <span className="text-gray-500">{item.icon}</span>
                                            {item.name}
                                        </NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="pt-2 mt-2 border-t">
                            <ul className="text-sm font-medium">
                                {
                                    navsFooter.map((item, idx) => (
                                        <li key={idx}>
                                            <NavLink
                                                to={item.href}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-x-2 p-2 rounded-lg duration-150 ${isActive
                                                        ? 'bg-gray-900 text-slate-300'
                                                        : 'text-slate-500 hover:bg-gray-900 hover:text-slate-300'
                                                    }`
                                                }
                                            >
                                                <span className="text-gray-500">{item.icon}</span>
                                                {item.name}
                                                {item.count > 0 && (
                                                    <span className="ml-2 flex items-center justify-center w-5 h-5 text-white font-bold bg-red-500 rounded-full">
                                                        {item.count}
                                                    </span>
                                                )}
                                            </NavLink>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div >
                </div>
            </nav>
        </>
    );
};

export default Sidebar;