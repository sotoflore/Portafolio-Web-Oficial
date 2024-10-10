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

const EditProject = () => {
    const { id } = useParams();

    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tags, setTags] = useState('');
    const [url, setUrl] = useState('');


    const [imagenUrl, setImagenUrl] = useState('');

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const { uploadImage, uploading } = useImageUpload('proyectos');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'proyectos', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setNombre(data.nombre)
                setDescripcion(data.descripcion)
                setTags(data.tags)
                setUrl(data.url)

                setImagenUrl(data.imagenUrl);
                setImagePreview(data.imagenUrl);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdateProject = async (e) => {
        e.preventDefault();
        try {
            let updatedImagenUrl = imagenUrl;
            if (file) {
                updatedImagenUrl = await uploadImage(file);
            }
            const data = {
                nombre,
                descripcion,
                tags: tags.split(','),
                url,
                imagenUrl: updatedImagenUrl,
                createdAt: serverTimestamp()
            };
            await updateDoc(doc(db, 'proyectos', id), data);
            navigate("/access/admin/list-projects");
            Swal.fire({
                titleText: "Datos actualizados correctamente",
                text: "Proyecto editado exitosamente",
                icon: "success",
                position: "center",
                heightAuto: "false",
            });
        } catch (error) {
            console.error("Error al actualizar información de proyecto:", error);
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
        <form onSubmit={handleUpdateProject} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Editar Información de Perfil</h2>
            <InputField
                textLabel="Nombre del Proyecto"
                type="text"
                placeholder="Ingresa el nombre de tu proyecto"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <TextArea
                textLabel="Descripción"
                placeholder="Escribe la descripción de tu proyecto aqui"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}

            />
            <InputField
                textLabel="Tags/Tecnologías usadas"
                type="text"
                placeholder="Escribe las tecnologías usadas en el proyecto(separados por comas)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />

            <InputField
                textLabel="Url del Proyecto"
                type="url"
                placeholder="Ingresa la url de tu proyecto"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <InputFile onChange={handleImageChange} />

            <div className='flex justify-center border w-full'>
                {uploading && <p>Cargando imagen...</p>}
                {imagePreview && !uploading && <img src={imagePreview} alt="Vista previa" className="w-40 mb-4" />}
            </div>
            <AddButton textButton="Actualizar proyecto" />
        </form>
    );
};

export default EditProject;