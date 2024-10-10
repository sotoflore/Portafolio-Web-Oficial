import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import useImageUpload from '../../../hooks/useImageUpload';
import InputField from '../../../components/form/InputField';
import InputFile from '../../../components/form/InputFile';
import AddButton from '../../../components/form/AddButton';
import TextArea from '../../../components/form/TextArea';

const EditCertification = () => {
    const { id } = useParams();

    const [nombre, setNombre] = useState('');
    const [url, setUrl] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'certificaciones', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setNombre(data.nombre)
                setUrl(data.url)
            }
        };
        fetchData();
    }, [id]);

    const handleUpdateCertification = async (e) => {
        e.preventDefault();
        try {
            const data = {
                nombre,
                url,
                createdAt: serverTimestamp()
            };
            await updateDoc(doc(db, 'certificaciones', id), data);
            navigate("/access/admin/list-certification");
            Swal.fire({
                titleText: "Datos actualizados correctamente",
                text: "Certificacion editado exitosamente",
                icon: "success",
                position: "center",
                heightAuto: "false",
            });
        } catch (error) {
            console.error("Error al actualizar información de certificacion:", error);
        }
    };


    return (
        <form onSubmit={handleUpdateCertification} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Editar Información de Perfil</h2>
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
            <AddButton textButton="Actualizar certificacion" />
        </form>
    );
};

export default EditCertification;