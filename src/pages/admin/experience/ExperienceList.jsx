import { IoMdAdd } from "react-icons/io";
import { LuFileEdit } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import useFirestoreCollection from '../../../hooks/useFirestoreCollection';
import ButtonActions from "../../../components/button/ButtonAcctions";
import ButtonAddLink from "../../../components/button/ButtonAddLink";

const ExperienceList = () => {

    const { data: experiencias, handleDelete } = useFirestoreCollection('experiencias');
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/access/admin/edit-experience/${id}`);
    };

    return (
        <div className="my-8 bg-white shadow-md rounded-md py-4 px-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 my-3">Experiencias Laborales</h2>
                <ButtonAddLink
                    to="/access/admin/add-experience"
                    buttonText="Agregar Experiencia"
                />
            </div>
            <div className="mt-4 space-y-6">
                {experiencias.map((experience) => (
                    <div key={experience.id} className="flex justify-between items-start space-x-4 border p-4 broder-gray-400 rounded shadow">
                        <div>
                            <h4 className="text-lg font-medium">{experience.cargo}</h4>
                            <p className="text-gray-600">{experience.empresa}</p>
                            <p className="text-gray-500 text-sm">{experience.fechaInicio} - {experience.fechaFin}</p>
                            <p className="text-gray-500 text-sm">{experience.lugar}</p>
                        </div>
                        <ButtonActions
                            onEdit={() => handleEdit(experience.id)}
                            onDelete={() => handleDelete(experience.id, experience.imagenUrl)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExperienceList;