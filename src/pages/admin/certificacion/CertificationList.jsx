import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import useFirestoreCollection from '../../../hooks/useFirestoreCollection';
import ButtonActions from "../../../components/button/ButtonAcctions";
import ButtonAddLink from "../../../components/button/ButtonAddLink";

const CertificationList = () => {
    
    const { data: certificaciones, handleDelete } = useFirestoreCollection('certificaciones');
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/access/admin/edit-certification/${id}`);
    };

    return (
        <div className="my-8 bg-white shadow-md rounded-md py-4 px-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 my-3">Certificaciones</h2>
                <ButtonAddLink
                    to="/access/admin/add-certification"
                    buttonText="Agregar certificación"
                />
            </div>
            <div className="mt-4 space-y-6 flex items-center gap-5 w-full">
                <div className="shadow-sm border rounded-lg overflow-x-auto w-full">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">nombre de certificación</th>
                                <th className="py-3 px-6">url certificación</th>
                                <th className="py-3 px-6">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                certificaciones.map((certification) => (
                                    <tr key={certification.id}>
                                        <td className="flex items-center gap-x-3 py-3 px-6 whitespace-wrap">
                                            {certification.nombre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{certification.url}</td>
                                        <td className="ps-5 whitespace-nowrap">
                                            <ButtonActions
                                                onEdit={() => handleEdit(certification.id)}
                                                onDelete={() => handleDelete(certification.id, certification.imagenUrl)}
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

export default CertificationList;