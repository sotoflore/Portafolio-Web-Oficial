import { useState } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useImageUpload from '../../../hooks/useImageUpload';
import InputField from '../../../components/form/InputField';
import InputFile from '../../../components/form/InputFile';
import AddButton from '../../../components/form/AddButton';

const AddKnowledge = () => {
    
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');

    const [file, setFile] = useState(null);
    const { imagenUrl, error, uploadImage, uploading } = useImageUpload('conocimientos');
    const [imagePreview, setImagePreview] = useState('');

    const handleAddKnowledge = async (e) => {
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
                imagenUrl,
                createdAt: serverTimestamp(),
            };
            await addDoc(collection(db, 'conocimientos'), data);
            navigate("/access/admin/list-knowledge")
            Swal.fire({
                titleText: "Datos Enviados correctamente",
                text: "Conocimiento agregado exitosamente",
                icon: "success",
                position: "center",
                heightAuto: "false",
            });
        } catch (error) {
            
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
        <form onSubmit={handleAddKnowledge} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Agregar Conocimiento</h2>

            <InputField
                textLabel="Conocimiento/tecnología"
                placeholder="Nombre del Conocimiento"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
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
            <AddButton textButton="Agregar conocimiento" />
        </form>
    );
};

export default AddKnowledge;