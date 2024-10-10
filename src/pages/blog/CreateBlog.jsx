import React, { useRef, useState, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import InputFile from '../../components/form/InputFile';
import useImageUpload from '../../hooks/useImageUpload';

const CreateBlog = () => {
    const quillRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const [title, setTitle] = useState('');

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const { imagenUrl, error, uploadImage, uploading } = useImageUpload('blogs');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        if (quillRef.current && !editor) {
            const quillInstance = new Quill(quillRef.current, {
                theme: 'snow',
                modules: { toolbar: true },
                placeholder: 'Escribe el contenido aquí...',
            });
            setEditor(quillInstance);
        }
    }, [editor]);

    const handleSave = async () => {
        if (editor) {
            const content = editor.root.innerHTML;
            const createdAt = new Date().toISOString();


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
                    content,
                    title,
                    imagenUrl,
                    createdAt: serverTimestamp(),
                };

                await addDoc(collection(db, 'blogs'), data);
                alert('Blog creado exitosamente');
                navigate('/access/admin/list-blogs');
            } catch (error) {
                console.error('Error al guardar el blog: ', error);
            }
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
        <div className="space-y-4 bg-white p-6 rounded shadow-md">
            <input
                type="text"
                value={title}
                onChange={(e) =>  setTitle(e.target.value)}
                placeholder="Título del blog"
                className="border p-2 w-full rounded"
            />
            <div ref={quillRef} className="border rounded-lg"></div>

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
            <button onClick={handleSave} className="bg-slate-900 text-white px-4 py-2 rounded">
                Guardar blog
            </button>
        </div>
    );
};

export default CreateBlog;


