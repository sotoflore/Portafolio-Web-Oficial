import { IoMdAdd} from "react-icons/io";
import { FiExternalLink } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import useFirestoreCollection from '../../../hooks/useFirestoreCollection';
import ButtonActions from "../../../components/button/ButtonAcctions";
import ButtonAddLink from "../../../components/button/ButtonAddLink";

const ProjectList = () => {
    
    const { data: projects, handleDelete } = useFirestoreCollection('proyectos');
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/access/admin/edit-project/${id}`);
    };

    return (
        <div className="my-8 bg-white shadow-md rounded-md py-4 px-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 my-3">Proyectos</h2>
                <ButtonAddLink
                    to="/access/admin/add-project"
                    buttonText="Agregar Proyecto"
                />
            </div>
            <div className="mt-4 space-y-6">
                {projects.map((project) => (
                    <div key={project.id} className="flex justify-between items-start space-x-4 border broder-gray-400 rounded shadow p-4">
                        <div className="flex space-x-4">
                            <img src={project.imagenUrl} alt="imagen empresa" className="w-20 h-20 object-contain" />
                            <div>
                                <h4 className="text-lg font-medium">{project.nombre}</h4>
                                <div>
                                    {project.tags && project.tags.length > 0 && (
                                        <ul className="flex space-x-2 mt-2">
                                            {project.tags.map((tag, index) => (
                                                <li key={index} className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded">
                                                    {tag.trim()}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="pt-2">
                                    <a href={project.url} className="flex items-center gap-1 text-gray-700 rounded text-sm">
                                        <span>Ver proyecto</span>
                                        <FiExternalLink />
                                    </a>
                                </div>
                            </div>
                       </div>
                        <ButtonActions
                            onEdit={() => handleEdit(project.id)}
                            onDelete={() => handleDelete(project.id, project.imagenUrl)}
                        />
                    </div>
                ))}

            </div>
        </div>
    );
};

export default ProjectList;