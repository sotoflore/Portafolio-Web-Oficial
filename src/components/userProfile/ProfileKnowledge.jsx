import useFirestoreCollection from "../../hooks/useFirestoreCollection";
import SkeletonKnowledge from "../skeleton/SkeletonKnowledge";

const ProfileKnowledge = () => {
    const { data: knowledges, loading, error } = useFirestoreCollection('conocimientos');

    if (loading) return <SkeletonKnowledge/>;
    if (error) return <div>Error al cargar el perfil: {error.message}</div>;

    return (
        <div className="mt-4">
            <p className="text-slate-400 text-2xl mb-4 font-bold">
                Conocimientos
            </p>
            <div className="flex flex-wrap gap-5 rounded-md">
                {
                    knowledges.map((knowledge) => (
                        <div key={knowledge.id} className="flex flex-col justify-between items-center p-3 rounded border border-purple-500">
                            <img src={knowledge.imagenUrl} className="w-12 h-12" alt="imagen de tecnología" />
                            <h3 className="text-purple-500 font-medium">{knowledge.nombre}</h3>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default ProfileKnowledge;