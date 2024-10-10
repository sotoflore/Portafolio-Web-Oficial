import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import InputField from '../../components/form/InputField';
import TextArea from '../../components/form/TextArea';
import AddButton from '../../components/form/AddButton';
import useImageUpload from '../../hooks/useImageUpload';
import InputFile from '../../components/form/InputFile';
import { useNavigate, useParams } from 'react-router-dom';

const EditProfileInfo = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [contacto, setContacto] = useState('');
    const [email, setEmail] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const { uploadImage, uploading } = useImageUpload('perfil');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'perfil', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setNombre(data.nombre);
                setDescripcion(data.descripcion);
                setContacto(data.contacto);
                setEmail(data.email);
                setImagenUrl(data.imagenUrl);
                setImagePreview(data.imagenUrl);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdateProfileInfo = async (e) => {
        e.preventDefault();
        try {
            let updatedImagenUrl = imagenUrl;
            if (file) {
                updatedImagenUrl = await uploadImage(file);
            }
            const data = {
                nombre,
                descripcion,
                contacto,
                email,
                imagenUrl: updatedImagenUrl,
                createdAt: serverTimestamp()
            };
            await updateDoc(doc(db, 'perfil', id), data);
            navigate("/access/admin/perfil-admin");
            Swal.fire({
                titleText: "Datos actualizados correctamente",
                text: "Perfil editado exitosamente",
                icon: "success",
                position: "center",
                heightAuto: "false",
            });
        } catch (error) {
            console.error("Error al actualizar información de perfil:", error);
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
        <form onSubmit={handleUpdateProfileInfo} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Editar Información de Perfil</h2>
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
            <AddButton textButton="Actualizar Perfil" />
        </form>
    );
};

export default EditProfileInfo;
