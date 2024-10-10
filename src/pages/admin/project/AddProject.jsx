// src/components/AddProject.js
import { useState } from 'react';
import { db, storage } from '../../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import useImageUpload from '../../../hooks/useImageUpload';
import Swal from 'sweetalert2';
import InputField from '../../../components/form/InputField';
import InputFile from '../../../components/form/InputFile';
import AddButton from '../../../components/form/AddButton';
import TextArea from '../../../components/form/TextArea';
import { useNavigate } from 'react-router-dom';

const AddProject = () => {

    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tags, setTags] = useState('');
    const [url, setUrl] = useState('');

    const [file, setFile] = useState(null);
    const { imagenUrl, error, uploadImage, uploading } = useImageUpload('proyectos');
    const [imagePreview, setImagePreview] = useState('');

    //const [imagen, setImagen] = useState(null);

    const handleAddProject = async (e) => {
        e.preventDefault();

        try {
            let imagenUrl = '';
            if (file) {
                imagenUrl = await uploadImage(file);
                if (!imagenUrl) {
                    Swal.fire({
                        titleText: "Error",
                        text: "Error al cargar la imagen",
                        icon: "error",
                        position: "center",
                        heightAuto: "false",
                    });
                    throw new Error("Error al cargar la imagen");
                }
            }
            const data = {
                nombre,
                descripcion,
                tags: tags.split(','),
                url,
                imagenUrl,
                createdAt: serverTimestamp(),
            };
            await addDoc(collection(db, 'proyectos'), data);
            console.log(data)
            navigate("/access/admin/list-projects")
            Swal.fire({
                titleText: "Datos Enviados correctamente",
                text: "Proyecto agregado exitosamente",
                icon: "success",
                position: "center",
                heightAuto: "false",
            });
        } catch (error) {
            console.error("Error al agregar un proyecto:", error);
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
        <form onSubmit={handleAddProject} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Agregar Proyecto</h2>

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
                {file && (
                    uploading ? (
                        <p>Cargando imagen...</p>
                    ) : (
                        <img src={imagePreview} alt="Vista previa" className="w-40 mb-4" />
                    )
                )}
            </div>
            <AddButton textButton="Agregar Proyecto" />
        </form>
    );
};

export default AddProject;