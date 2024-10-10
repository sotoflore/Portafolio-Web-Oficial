import { Link } from 'react-router-dom';
import imgPerfil from '../../assets/image-francisco-soto.jpg'
import { AiOutlineCloudDownload } from "react-icons/ai";
import { RxExternalLink } from "react-icons/rx";
import DownloadCV from '../card/DownloadCV';

const CardPerfil = () => {

    return (
        <div className="w-full flex-1 rounded-lg">
            <div className="relative h-24 bg-slate-800">
                <img className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-24 w-24 rounded-full border-4 border-gray-900" src={imgPerfil} alt="Profile picture" />
            </div>
            <div className="pt-16 px-6 pb-6">
                <h1 className="text-xl font-bold text-center text-slate-300">Francisco Soto Flores</h1>
                <p className="text-center mt-2">
                    <span className='inline-block text-slate-400'>Ingeniero de Telecomunicaciones</span>
                    <span className='inline-block text-slate-400'>Desarrollador de Software</span>
                </p>
                <div className="mt-6">
                    <DownloadCV/>
                    <Link to="/perfil" className="mt-3 w-full border border-gray-500 text-slate-400 py-2 px-4 gap-1 rounded flex items-center justify-center">
                        <span>Ver perfil</span>
                        <RxExternalLink/>
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default CardPerfil;