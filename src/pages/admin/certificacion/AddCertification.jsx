import { useState } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AddButton from '../../../components/form/AddButton';
import InputField from '../../../components/form/InputField';
import Swal from 'sweetalert2';

const AddCertification = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [url, setUrl] = useState('');

    const handleAddCertification = async (e) => {
        e.preventDefault();
        try {
            const data = {
                nombre,
                url,
                createdAt: serverTimestamp(),
            }
            await addDoc(collection(db, 'certificaciones'),data);
            navigate("/access/admin/list-certification")
            Swal.fire({
                titleText: "Datos Enviados correctamente",
                text: "Certificación agregada exitosamente",
                icon: "success",
                position: "center",
                heightAuto: "false",
            });
        } catch (error) {
            console.error("Error al agregar certificación:", error);
        }
    };

    return (
        <form onSubmit={handleAddCertification} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Agregar Certificación</h2>
            <InputField
                textLabel="Nombre certificación"
                placeholder="Ingresa el nombre de la certificación"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <InputField
                textLabel="Url certificación"
                placeholder="Ingresa url de la certificación"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <AddButton textButton="Agregar certificación" />
        </form>
    );
};

export default AddCertification;