import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../../firebase';
import Swal from 'sweetalert2';
import { MdOutlineEmail, MdOutlineLockPerson } from "react-icons/md";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Swal.fire({
                title: "correcto",
                text: "Has iniciado sesión correctamente",
                icon: "success",
            });
            navigate('/access/admin/perfil-admin');
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "Credenciales incorrectas, intenta nuevamente",
                icon: "error"
            });
        }
    };

    return (
        <section className="flex flex-col px-10 md:px-20 justify-center items-center h-screen relative">
            <form onSubmit={handleLogin} className="w-full md:w-1/2 rounded-lg border p-8 shadow-md bg-white">
                <h1 className='text-2xl md:text-5xl mb-6 font-black text-purple-800 text-center w-full'>Admin Portafolio</h1>
                <div className="space-y-1">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <MdOutlineEmail className='text-xl'/>
                        </div>
                        <input
                            type="email"
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-400 mb-5 text-gray-900 text-sm rounded-md block w-full ps-10 p-2.5"
                            placeholder="exampple@example"
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <div className="relative mb-6">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <MdOutlineLockPerson className='text-xl' />
                        </div>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu password"
                            className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-md block w-full ps-10 p-2.5"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className='w-full inline-block mt-10 text-gray-200 font-bold bg-gray-900 rounded-md py-2'
                >
                    Inicia sesión
                </button>
            </form>
        </section>
    );
};

export default Login;