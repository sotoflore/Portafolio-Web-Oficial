import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { db, collection, addDoc} from '../../../firebase';
import useImageUpload from '../../../hooks/useImageUpload';
import InputField from '../../../components/form/InputField';
import TextArea from '../../../components/form/TextArea';
import InputFile from '../../../components/form/InputFile';
import AddButton from '../../../components/form/AddButton';
import { serverTimestamp } from 'firebase/firestore';

const AddExperience = () => {
    const navigate = useNavigate()
    const [cargo, setCargo] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [lugar, setLugar] = useState('');
    const [descripcion, setDescripcion] = useState('');
    
    const [file, setFile] = useState(null);
    const { imagenUrl, error, uploadImage, uploading } = useImageUpload('experiences');
    const [imagePreview, setImagePreview] = useState('');

    const handleAddExperience = async (e) => {
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
            }
            const data = {
                cargo,
                empresa,
                fechaInicio,
                fechaFin: fechaFin || 'actualidad',
                lugar,
                descripcion,
                imagenUrl,
                createdAt: serverTimestamp(),
            };
            await addDoc(collection(db, 'experiencias'), data);
            navigate("/access/admin/list-experience")

            Swal.fire({
                titleText: "Datos Enviados correctamente",
                text: "Experiencia agregada exitosamente",
                icon: "success",
                position: "center",
                heightAuto: "false",
            });
        } catch (error) {
            console.error("Error al agregar experiencia:", error);
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
        <form onSubmit={handleAddExperience} className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">Agregar Experiencia</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
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

            <InputFile onChange={handleImageChange}/>
    
            <div className='flex justify-center border w-full'>
                {uploading && <p>Cargando imagen...</p>}
                {imagePreview && !uploading && <img src={imagePreview} alt="Vista previa" className="w-40 mb-4" />}
            </div>
            <AddButton textButton="Agregar Experiencia"/>
        </form>
    );
};

export default AddExperience;
