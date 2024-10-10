import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth, signOut } from '../../firebase';
import Sidebar from '../../components/sidebar/Sidebar';

const Admin = () => {
    const currentUser = useAuth();
    const navigate = useNavigate();


    const handleLogout = async () => {
        await signOut(auth);
        navigate('/auth/login');
    };
    return (
        <section className='flex flex-row bg-gray-100'>
            <div className='basis-1/4'>
                <Sidebar/>
            </div>
            <div className='basis-3/4 pe-10 min-h-screen'>
                <h1 className='my-5 text-4xl uppercase font-black text-purple-700'>Panel de Administración</h1>
                <Outlet />
            </div>
        </section>
    )
}
export default Admin;