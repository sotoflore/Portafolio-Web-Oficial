import { useState } from 'react';
import { db } from '../../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import AddButton from '../../../components/form/AddButton';
import InputField from '../../../components/form/InputField';
import Swal from 'sweetalert2';
import TextArea from '../../../components/form/TextArea';

const SendEmails = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handleSendEmail = async (e) => {
        
        e.preventDefault();
        if (!nombre || !email || !asunto || !mensaje) {
            Swal.fire({
                titleText: "Campos vacíos",
                text: "Por favor, completa todos los campos antes de enviar.",
                icon: "warning",
                position: "center",
                heightAuto: "false",
            });
            return;
        }

        try {
            const data = {
                nombre,
                email,
                asunto,
                mensaje,
                createdAt: serverTimestamp(),
            }
            await addDoc(collection(db, 'emails'), data);
            Swal.fire({
                titleText: "Datos Enviados correctamente",
                text: "Pronto nos comunicaremos con usted",
                icon: "success",
                position: "center",
                heightAuto: "false",
            });
            setNombre('');
            setEmail('');
            setAsunto('');
            setMensaje('');
        } catch (error) {
            console.error("Error al enviar el mensaje", error);
            Swal.fire({
                titleText: "error",
                text: "Hubo en error al enviar el mensaje",
                icon: "error",
                position: "center",
                heightAuto: "false",
            });
        }
    };

    return (
        <form onSubmit={handleSendEmail} className='bg-slate-100 relative border border-slate-700 p-4 rounded-md'>
            <InputField
                textLabel="Nombre completo"
                placeholder="Ingresa tu nombre completo"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <InputField
                textLabel="Correo electrónico"
                placeholder="Ingresa un correo electrónico válido"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                textLabel="Asunto"
                placeholder="Ingresa un asunto"
                type="text"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
            />
            <TextArea
                textLabel="Mensaje"
                placeholder="Escribe tu mensaje aquí..."
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}

            />
            <button type='submit' className='w-full bg-gray-900 text-white py-2 rounded-md'>
                Enviar
            </button>
        </form>
    );
};

export default SendEmails;