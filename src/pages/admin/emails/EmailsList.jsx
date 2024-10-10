import { RiDeleteBin5Line } from "react-icons/ri";
import useFirestoreCollection from "../../../hooks/useFirestoreCollection";

const EmailsList = () => {

    const { data: emails, loading, error, handleDelete } = useFirestoreCollection('emails');
    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error al cargar los datos: {error.message}</div>;
    }

    return (
        <div className="my-8 bg-white shadow-md rounded-md py-4 px-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 my-3">Emails recibidos</h2>
            </div>
            <div className="mt-4 space-y-6 flex items-center gap-5 w-full">
                <div className="shadow-sm border rounded-lg overflow-x-auto w-full">
                    <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6">Nombre</th>
                                <th className="py-3 px-6">Correo</th>
                                <th className="py-3 px-6">Asunto</th>
                                <th className="py-3 px-6">Mensaje</th>
                                <th className="py-3 px-6">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {
                                emails.map((email) => (
                                    <tr key={email.id}>
                                        <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                                            {email.nombre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-wrap">{email.email}</td>
                                        <td className="px-6 py-4 whitespace-wrap">{email.asunto}</td>
                                        <td className="px-6 py-4 whitespace-wrap">{email.mensaje}</td>
                                        <td className="text-right px-6 whitespace-nowrap">
                                            <button
                                                onClick={() => handleDelete(email.id)}
                                                className="text-red-500 text-2xl hover:text-red-700"
                                            >
                                                <RiDeleteBin5Line />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EmailsList;