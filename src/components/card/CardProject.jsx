import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import IconGoogle from '../icons/IconGoogle';
import SkeletonCardProject from '../skeleton/CardProjectSkeleton';

const CardProject = () => {
    const { data: projects, loading, error } = useFirestoreCollection('proyectos');

    if (loading) return <SkeletonCardProject/>
    if (error) return <div>Error al cargar el perfil: {error.message}</div>;

    return (
        <>
            {
                projects.map((project) => (
                    <article key={project.id} className="h-full p-3 w-full mb-8 relative bg-slate-900 border border-slate-700 rounded-md">
                        <h3 className="text-start text-2xl mb-2 font-bold text-green-600">
                            {project.nombre}
                        </h3>
                        <img className="h-96 w-full object-contain md:object-cover rounded-lg bg-custom-gradient" src={project.imagenUrl} alt="imagen de los proyectos" />
                        <p className='my-3 text-slate-400'>{project.descripcion }</p>
                        <div className='mb-3'>
                            {project.tags && project.tags.length > 0 && (
                                <ul className="flex gap-3 w-full flex-wrap mt-2">
                                    {project.tags.map((tag, index) => (
                                        <li key={index} className="bg-purple-100 text-purple-800 text-sm font-medium px-2 py-1 rounded">
                                            {tag.trim()}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div>
                            <a href={project.url} className="text-white md:mb-2 lg:mb-0 bg-slate-700 shadow-3xl hover:bg-gray-800 rounded px-5 py-1.5 inline-flex items-center justify-center border-0 w-full" target="_blank" rel="noopener noreferrer">
                                <IconGoogle />
                                <span className='ps-1'>Ver WebSite</span>
                            </a>
                        </div>
                    </article>
                ))
            }
        </>
    );
};
export default CardProject;