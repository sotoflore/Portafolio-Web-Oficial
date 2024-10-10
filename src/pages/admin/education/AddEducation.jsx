import { useState } from 'react';
import Swal from 'sweetalert2';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase';
import useImageUpload from '../../../hooks/useImageUpload';
import InputField from '../../../components/form/InputField';
import InputFile from '../../../components/form/InputFile';
import AddButton from '../../../components/form/AddButton';
import { useNavigate } from 'react-router-dom';

const AddEducation = () => {

    const navigate = useNavigate();
    const [universidad, setUniversidad] = useState('');
    const [carrera, setCarrera] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const [file, setFile] = useState(null);
    const { imagenUrl, error, uploadImage, uploading } = useImageUpload('educacion');
    const [imagePreview, setImagePreview] = useState('');

    const handleAddEducation = async (e) => {
        e.preventDefault();

        if (fechaFin && new Date(fechaFin) < new Date(fechaInicio)) {
            Swal.fire({
                titleText: "Error fecha",
                text: "La fecha de fin no puede ser anterior a la fecha de inicio",
                icon: "error",
                position: "center",
                heightAuto: "false",
            });
            return;
        }
        
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
                universidad,
                carrera,
                fechaInicio,
                fechaFin,
                imagenUrl,
                createdAt: serverTimestamp(),
            };
            await addDoc(collection(db, 'educacion'), data);
            navigate("/access/admin/list-education")
            Swal.fire({
                titleText: "Datos Enviados correctamente",
                text: "Educación agregada exitosamente",
                icon: "success",
                position: "center",
                heightAuto: "false",
            });
        } catch (error) {
            console.error("Error al agregar educación:", error);
            Swal.fire({
                titleText: "Error",
                text: "Hubo un problema al agregar la educación. Por favor, inténtalo de nuevo.",
                icon: "error",
                position: "center",
                heightAuto: false,
            });
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
        <form onSubmit={handleAddEducation} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Agregar Educación</h2>

            <InputField
                textLabel="Universidad"
                type="text"
                placeholder="Ingresa la universidad de estudio"
                value={universidad}
                onChange={(e) => setUniversidad(e.target.value)}
            />
            <InputField
                textLabel="Carrera/Profesión"
                type="text"
                placeholder="Ingresa su profesión de estudio"
                value={carrera}
                onChange={(e) => setCarrera(e.target.value)}
            />
            <InputField
                textLabel="Fecha de inicio"
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
            />
            <InputField
                textLabel="Fecha de finalización"
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
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
            <AddButton textButton="Agregar Educación" />
        </form>
    );
};

export default AddEducation;


