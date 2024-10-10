import img from '../../assets/image-section-about.jpg';
import DownloadCV from '../card/DownloadCV';
import ProfileKnowledge from './ProfileKnowledge';
import { BsGeoAlt, BsEnvelope, BsTelephoneForward } from "react-icons/bs";

const ProfileDetails = ({ item }) => {
    return (
        <div className="bg-slate-900 relative border border-slate-700 rounded-md overflow-hidden">
            <div className="relative">
                <img src={img} loading="lazy" alt="Background" className="w-full h-40 object-cover" />
                <div className="absolute -bottom-8 left-6 w-20 h-20 rounded-full border-4 border-white">
                    <img loading="lazy" src={item.imagenUrl} alt="Profile" className="w-full h-full object-cover rounded-full" />
                </div>
            </div>
            <div className="p-6">
                <div className="mt-5 md:mt-0 md:flex items-center justify-between w-full">
                    <h2 className="text-2xl text-slate-300 font-bold">{item.nombre}</h2>
                    <div>
                        <DownloadCV />
                    </div>
                </div>
                <p className="text-slate-400 mt-2">{item.descripcion}</p>
                <div className='md:flex items-center gap-10 my-5'>
                    <p className='flex items-center gap-2 text-slate-400 font-medium'>
                        <span className='bg-green-600 text-white p-1.5 rounded inline-block'>
                            <BsEnvelope />
                        </span>
                        <span>{item.email}</span>
                    </p>
                    <p className='flex items-center gap-2 text-slate-400 font-medium my-3 md:my-0'>
                        <span className='bg-green-600 text-white p-1.5 rounded inline-block'>
                            <BsTelephoneForward />
                        </span>
                         <span>{item.contacto}</span>
                    </p>
                    <p className="flex items-center gap-2 text-slate-400 font-medium">
                        <span className='bg-green-600 text-white p-1.5 rounded inline-block'>
                            <BsGeoAlt />
                        </span>
                        <span>Colombia</span>
                    </p>
                </div>
                <ProfileKnowledge />
            </div>
        </div>
    );
};

export default ProfileDetails;
