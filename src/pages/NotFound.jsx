import { Link } from 'react-router-dom';
import imageNotfound from '../assets/imagen-notfound.svg';

const NotFound = () => {
    return (
        <section className="h-screen flex justify-center items-center">
            <div className="text-center">
                <img src={imageNotfound} className='w-[25rem] block' alt="imagen de error" />
                <p className="font-bold">Página no encontrada</p>
                <Link to="/" className="mt-3 inline-block rounded bg-slate-900 px-10 py-3 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring">
                    Regresar al inicio
                </Link>
            </div>
        </section>
    )
}
export default NotFound;