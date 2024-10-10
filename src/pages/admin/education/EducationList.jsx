import { IoMdAdd } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import useFirestoreCollection from '../../../hooks/useFirestoreCollection';
import ButtonActions from "../../../components/button/ButtonAcctions";
import ButtonAddLink from "../../../components/button/ButtonAddLink";

const EducationList = () => {

    const { data: educacion, handleDelete } = useFirestoreCollection('educacion');
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/access/admin/edit-education/${id}`);
    };

    return (
        <div className="my-8 bg-white shadow-md rounded-md py-4 px-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 my-3">Educacion</h2>
                <ButtonAddLink
                    to="/access/admin/add-education"
                    buttonText="Agregar Educacion"
                />
            </div>
            <div className="mt-4 space-y-6">
                {educacion.map((education) => (
                    <div key={education.id} className="flex justify-between space-x-4 items-start border p-4 rounded broder-gray-400 shadow">
                        <div>
                            <h4 className="text-lg font-medium">{education.universidad}</h4>
                            <p className="text-gray-600">{education.carrera}</p>
                            <p className="text-gray-500 text-sm">{education.fechaInicio} - {education.fechaFin}</p>
                        </div>
                        <ButtonActions
                            onEdit={() => handleEdit(education.id)}
                            onDelete={() => handleDelete(education.id, education.imagenUrl)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EducationList;