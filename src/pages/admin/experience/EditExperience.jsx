import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';
/* import InputField from '../../../components/form/InputField';
import TextArea from '../../../components/form/TextArea';
import AddButton from '../../../components/form/AddButton';
import useImageUpload from '../../hooks/useImageUpload';
import InputFile from '../../components/form/InputFile'; */
import { useNavigate, useParams } from 'react-router-dom';
import useImageUpload from '../../../hooks/useImageUpload';
import InputField from '../../../components/form/InputField';
import TextArea from '../../../components/form/TextArea';
import InputFile from '../../../components/form/InputFile';
import AddButton from '../../../components/form/AddButton';

const EditExperience = () => {
    const { id } = useParams();

    const [cargo, setCargo] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [lugar, setLugar] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');


    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const { uploadImage, uploading } = useImageUpload('experiences');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, 'experiencias', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setCargo(data.cargo);
                setEmpresa(data.empresa);
                setFechaInicio(data.fechaInicio);
                setFechaFin(data.fechaFin);
                setLugar(data.lugar);
                setDescripcion(data.descripcion);
                setImagenUrl(data.imagenUrl);
                setImagePreview(data.imagenUrl);
            }
        };
        fetchData();
    }, [id]);

    const handleUpdateExperience = async (e) => {
        e.preventDefault();
        try {
            let updatedImagenUrl = imagenUrl;
            if (file) {
                updatedImagenUrl = await uploadImage(file);
            }
            const data = {
                cargo,
                empresa,
                fechaInicio,
                fechaFin,
                lugar,
                descripcion,
                imagenUrl: updatedImagenUrl,
                createdAt: serverTimestamp()
            };
            await updateDoc(doc(db, 'experiencias', id), data);
            navigate("/access/admin/list-experience");
            Swal.fire({
                titleText: "Datos actualizados correctamente",
                text: "Experiencia editado exitosamente",
                icon: "success",
                position: "center",
                heightAuto: "false",
            });
        } catch (error) {
            console.error("Error al actualizar información de experiencia:", error);
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
        <form onSubmit={handleUpdateExperience} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Editar Información de Perfil</h2>
            <InputField
                textLabel="Cargo"
                type="text"
                placeholder="Ingresa el cargo"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
            />
            <InputField
                textLabel="Empresa"
                type="text"
                placeholder="Ingresa la empresa"
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
            />
            <InputField
                textLabel="Fecha de inicio"
                type="date"
                placeholder="Ingresa la empresa"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
            />
            <InputField
                textLabel="Fecha de finalización"
                type="date"
                placeholder="Ingresa la empresa"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
            />
            <InputField
                textLabel="Ubicación"
                type="text"
                placeholder="Ingresa la ubicación"
                value={lugar}
                onChange={(e) => setLugar(e.target.value)}
            />
            <TextArea
                textLabel="Descripción"
                placeholder="Escribe tus funciones aquí..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}

            />

            <InputFile onChange={handleImageChange} />

            <div className='flex justify-center border w-full'>
                {uploading && <p>Cargando imagen...</p>}
                {imagePreview && !uploading && <img src={imagePreview} alt="Vista previa" className="w-40 mb-4" />}
            </div>


            <AddButton textButton="Actualizar Experiencia" />
        </form>
    );
};

export default EditExperience;
