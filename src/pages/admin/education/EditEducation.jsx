import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import useImageUpload from '../../../hooks/useImageUpload';
import InputField from '../../../components/form/InputField';
import InputFile from '../../../components/form/InputFile';
import AddButton from '../../../components/form/AddButton';

const EditEducation = () => {
    const { id } = useParams();

    const [universidad, setUniversidad] = useState('');
    const [carrera, setCarrera] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');


    const [imagenUrl, setImagenUrl] = useState('');

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const { uploadImage, uploading } = useImageUpload('educacion');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'educacion', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setUniversidad(data.universidad)
                setCarrera(data.carrera)
                setFechaInicio(data.fechaInicio)
                setFechaFin(data.fechaFin)

                setImagenUrl(data.imagenUrl);
                setImagePreview(data.imagenUrl);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdateEducation = async (e) => {
        e.preventDefault();
        try {
            let updatedImagenUrl = imagenUrl;
            if (file) {
                updatedImagenUrl = await uploadImage(file);
            }
            const data = {
                universidad,
                carrera,
                fechaInicio,
                fechaFin,
                imagenUrl: updatedImagenUrl,
                createdAt: serverTimestamp()
            };
            await updateDoc(doc(db, 'educacion', id), data);
            navigate("/access/admin/list-education");
            Swal.fire({
                titleText: "Datos actualizados correctamente",
                text: "Educación editado exitosamente",
                icon: "success",
                position: "center",
                heightAuto: "false",
            });
        } catch (error) {
            console.error("Error al actualizar información de educación:", error);
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
        <form onSubmit={handleUpdateEducation} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Editar Información de Perfil</h2>
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
                {uploading && <p>Cargando imagen...</p>}
                {imagePreview && !uploading && <img src={imagePreview} alt="Vista previa" className="w-40 mb-4" />}
            </div>
            <AddButton textButton="Actualizar Educación" />
        </form>
    );
};

export default EditEducation;