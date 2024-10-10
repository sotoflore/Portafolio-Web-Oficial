import useFirestoreCollection from '../../hooks/useFirestoreCollection';

const Experience = () => {

    const { data: experiences, loading, error } = useFirestoreCollection('experiencias');

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar el perfil: {error.message}</div>;

    return (
        <div className="md:basis-1/2 mt-8 md:my-8 bg-slate-900 relative border border-slate-700 rounded-md p-4">
            <h3 className="text-2xl font-bold text-slate-300">Experiencias</h3>
            <div className="mt-4 space-y-6">
                {
                    experiences.map((experience) => (
                        <div key={experience.id} className="flex gap-4">
                            <img src={experience.imagenUrl} alt="Elys BMG Group" className="hidden lg:block w-12 h-12 object-contain" />
                            <div>
                                <h4 className="text-lg text-slate-400 font-medium">{experience.cargo}</h4>
                                <p className="text-slate-500">{experience.empresa }</p>
                                <p className="text-slate-500 text-sm">{experience.fechaInicio} - {experience.fechaFin}</p>
                                <p className="text-slate-500 text-sm">{experience.lugar}</p>
                                <p className="text-slate-500 text-sm">{experience.descripcion}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Experience;