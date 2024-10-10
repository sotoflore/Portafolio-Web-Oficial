import { useState } from 'react';
import { db } from '../../firebase';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import InputField from '../../components/form/InputField';
import TextArea from '../../components/form/TextArea';
import AddButton from '../../components/form/AddButton';
import useImageUpload from '../../hooks/useImageUpload';
import InputFile from '../../components/form/InputFile';
import { useNavigate } from 'react-router-dom';

const ProfileInfo = () => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [contacto, setContacto] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const { imagenUrl, error, uploadImage, uploading } = useImageUpload('perfil');
    const [imagePreview, setImagePreview] = useState('');

    const handleAddProfileInfo = async (e) => {
        e.preventDefault();
        try {
            let imagenUrl = '';
            if (file) {
                imagenUrl = await uploadImage(file);
            }
            const data = {
                nombre,
                descripcion,
                contacto,
                email,
                imagenUrl,
                createdAt: serverTimestamp(),
            };
            await addDoc(collection(db, 'perfil'), data);
            navigate("/access/admin/perfil-admin")
            Swal.fire({
                titleText: "Datos Enviados correctamente",
                text: "Perfil agregado exitosamente",
                icon: "success",
                position: "center",
                heightAuto: "false",
            });
        } catch (error) {
            console.error("Error al agregar información de perfil:", error);
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            const fileUrl = URL.createObjectURL(selectedFile);
            setImagePreview(fileUrl);
        }
    };

    return (
        <form onSubmit={handleAddProfileInfo} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Agregar Información de Perfil</h2>
            <InputField
                textLabel="Nombre"
                type="text"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <TextArea
                textLabel="Descripción de perfil"
                placeholder="Descripción de perfil"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}

            />
            <InputField
                textLabel="Contacto/número"
                type="text"
                placeholder="Ingresa tus contactos"
                value={contacto}
                onChange={(e) => setContacto(e.target.value)}
            />
            <InputField
                textLabel="Email"
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputFile onChange={handleImageChange} />

            <div className='flex justify-center border w-full'>
                {uploading && <p>Cargando imagen...</p>}
                {imagePreview && !uploading && <img src={imagePreview} alt="Vista previa" className="w-40 mb-4" />}
            </div>
            <AddButton textButton="Agregar Perfil"/>
        </form>
    );
};

export default ProfileInfo;