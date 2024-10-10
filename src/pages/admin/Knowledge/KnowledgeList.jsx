import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import useFirestoreCollection from '../../../hooks/useFirestoreCollection';
import ButtonActions from "../../../components/button/ButtonAcctions";
import ButtonAddLink from "../../../components/button/ButtonAddLink";

const KnowledgeList = () => {

    const { data: conocimientos, handleDelete } = useFirestoreCollection('conocimientos');
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/access/admin/edit-knowledge/${id}`);
    };

    return (
        <div className="my-8 bg-white shadow-md rounded-md py-4 px-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 my-3">Conocimientos</h2>
                <ButtonAddLink
                    to="/access/admin/add-knowledge"
                    buttonText="Agregar Conocimiento"
                />
            </div>
            <div className="mt-4 space-y-6 flex items-center gap-5 w-full">
                <div className="shadow-sm border rounded-lg overflow-x-auto w-full">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Imagen Tecnología</th>
                                <th className="py-3 px-6">Nombre Tecnología</th>
                                <th className="py-3 px-6">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                conocimientos.map((knowledge) => (
                                    <tr key={knowledge.id}>
                                        <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                            <img src={knowledge.imagenUrl} className="w-10 h-10 rounded" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{knowledge.nombre}</td>
                                        <td className="ps-5">
                                            <ButtonActions
                                                onEdit={() => handleEdit(knowledge.id)}
                                                onDelete={() => handleDelete(knowledge.id, knowledge.imagenUrl)}
                                            />                                    
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default KnowledgeList;