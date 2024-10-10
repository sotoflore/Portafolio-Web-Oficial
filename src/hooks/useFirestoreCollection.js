import { useEffect, useMemo, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { deleteObject, ref } from 'firebase/storage';

const useFirestoreCollection = (collectionName) => {
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q,
            //collection(db, collectionName),
            (snapshot) => {
                const dataList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(dataList);
                setLoading(false);
            },
            (error) => {
                setError(error);
                setLoading(false);
            }
        ); 

        return () => unsubscribe();
    }, [collectionName]);

    /* useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(dataList);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionName]); */

    const handleDelete = async (id, imagenUrl) => {
        try {
            await deleteDoc(doc(db, collectionName, id));
            if (imagenUrl) {
                const imageRef = ref(storage, imagenUrl);
                await deleteObject(imageRef);
            }
            alert('Elemento eliminado correctamente');
        } catch (error) {
            console.error('Error al eliminar el elemento:', error);
        }
    };

    return { data, loading, error, handleDelete };
};

export default useFirestoreCollection;

