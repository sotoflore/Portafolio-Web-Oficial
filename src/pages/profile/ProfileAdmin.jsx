import { useNavigate } from 'react-router-dom';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import ButtonAddLink from '../../components/button/ButtonAddLink';
import ButtonActions from '../../components/button/ButtonAcctions';

const ProfileAdmin = () => {

    const { data: perfil, handleDelete } = useFirestoreCollection('perfil');
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/access/admin/edit-perfil/${id}`);
    };

    return (
        <div className="my-8 bg-white shadow-md rounded-md py-4 px-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 my-3">Perfil</h2>
                <ButtonAddLink
                    to="/access/admin/add-perfil"
                    buttonText="Agregar Perfil"
                />
            </div>
            <div className="mt-4 space-y-6">
                {perfil.map((item) => (
                    <div key={item.id}>
                        <img src={item.imagenUrl} alt="imagen empresa" className="w-32 h-32 object-contain" />
                        <div className='flex justify-between items-center'>
                            <h4 className="text-3xl font-bold my-2">{item.nombre}</h4>
                            <ButtonActions
                                onEdit={() => handleEdit(item.id)}
                                onDelete={() => handleDelete(item.id, item.imagenUrl)}
                            />
                        </div>
                        <p className="text-gray-600 my-2">{item.descripcion}</p>
                        <p className="text-slate-900 text-sm font-bold">{item.email}</p>
                        <p className="text-slate-900 text-sm font-bold">{item.contacto}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileAdmin;