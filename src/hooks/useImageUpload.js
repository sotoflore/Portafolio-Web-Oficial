import { useCallback, useState } from 'react';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const useImageUpload = (folderPath) => {

    const [imagenUrl, setImagenUrl] = useState('');
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);

    const uploadImage = useCallback( async (file) => {
        if (!file) return "";

        setUploading(true);
        setError('');
        const storageRef = ref(storage, `${folderPath}/${Date.now()}_${file.name}`);

        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setImagenUrl(url);
            return url;
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            setError('Hubo un problema al subir la imagen. Inténtalo de nuevo.');
            setUploading(false);
        }
    },[folderPath]);

    return { imagenUrl, error, uploadImage, uploading };
};

export default useImageUpload;
