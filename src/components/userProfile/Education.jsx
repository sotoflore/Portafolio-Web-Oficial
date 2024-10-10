import CardNewProject from "../card/CardNewProject";
import imgUPB from '../../assets/image-upb.jpg';
import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import { FaCheckCircle } from "react-icons/fa";

const Education = () => {

    const { data: educations, loading, error } = useFirestoreCollection('educacion');
    const { data: certifications } = useFirestoreCollection('certificaciones');

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar el perfil: {error.message}</div>;

    return (
        <div className='md:basis-1/2 md:mt-8'>
            <div className='p-4 bg-slate-900 relative border border-slate-700 rounded-md'>
                <h3 className='text-2xl mb-4 font-bold text-slate-300'>Educación</h3>
                {
                    educations.map((education) => (
                        <div key={education.id} className="flex space-x-4">
                            <img src={education.imagenUrl} alt="Elys BMG Group" className="w-12 h-12 object-contain" />
                            <div>
                                <h4 className="text-lg text-slate-400 font-semibold">{education.universidad}</h4>
                                <p className="text-slate-500">{education.carrera}</p>
                                <p className="text-slate-500 text-sm">{education.fechaInicio} - {education.fechaFin}</p>
                            </div>
                        </div>
                    ))
                }
                
            </div>
            <div className='p-4 mt-8 bg-slate-900 relative border border-slate-700 rounded-md'>
                <h3 className='text-2xl font-bold text-slate-300 mb-4'>Certificaciones</h3>
                {
                    certifications.map((certification) => (
                        <a key={certification.id} href={certification.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-gray-700 w-full py-2 px-4 rounded mb-3">
                            <FaCheckCircle className="text-green-500" />
                            <span className="text-slate-500">{certification.nombre}</span>
                        </a>
                    ))
                }
            </div>
        </div>
    )
}
export default Education;