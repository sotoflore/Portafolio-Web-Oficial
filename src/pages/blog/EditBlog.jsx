import React, { useRef, useState, useEffect } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import InputFile from '../../components/form/InputFile';
import useImageUpload from '../../hooks/useImageUpload';

const EditBlog = () => {
    const { id } = useParams();
    const quillRef = useRef(null);
    const [editor, setEditor] = useState(null);
    const [initialContent, setInitialContent] = useState('');
    const [title, setTitle] = useState('')
    const [imagenUrl, setImagenUrl] = useState('');
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const { uploadImage, uploading } = useImageUpload('blogs');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            const blogDoc = await getDoc(doc(db, 'blogs', id));
            if (blogDoc.exists()) {
                setInitialContent(blogDoc.data().content);
                setTitle(blogDoc.data().title)

                setImagenUrl(blogDoc.data().imagenUrl);
                setImagePreview(blogDoc.data().imagenUrl);
            }
        };

        fetchBlog();
    }, [id]);

    useEffect(() => {
        if (quillRef.current && !editor) {
            const quillInstance = new Quill(quillRef.current, {
                theme: 'snow',
                modules: { toolbar: true },
                placeholder: 'Escribe el contenido aquí...',
            });
            setEditor(quillInstance);
        }

        if (editor && initialContent) {
            editor.root.innerHTML = initialContent;
        }
    }, [editor, initialContent]);

    const handleUpdate = async () => {
        if (editor) {
            const content = editor.root.innerHTML;

            try {

                let updatedImagenUrl = imagenUrl;
                if (file) {
                    updatedImagenUrl = await uploadImage(file);
                }
                const data = {
                    content,
                    title,
                    imagenUrl: updatedImagenUrl,
                    createdAt: serverTimestamp()
                };

                await updateDoc(doc(db, 'blogs', id), data);
                alert('Blog actualizado exitosamente');
                navigate('/access/admin/list-blogs');
            } catch (error) {
                console.error('Error al actualizar el blog: ', error);
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
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título del blog"
                className="border p-2 w-full rounded"
            />
            <div ref={quillRef} className="border rounded-lg"></div>
            <InputFile onChange={handleImageChange} />

            <div className='flex justify-center border w-full'>
                {uploading && <p>Cargando imagen...</p>}
                {imagePreview && !uploading && <img src={imagePreview} alt="Vista previa" className="w-40 mb-4" />}
            </div>
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
                Actualizar
            </button>
        </div>
    );
};

export default EditBlog;
