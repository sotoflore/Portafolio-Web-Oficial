/* import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [randomBlogs, setRandomBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogDoc = await getDoc(doc(db, 'blogs', id));
                if (blogDoc.exists()) {
                    setBlog(blogDoc.data());
                } else {
                    navigate('/404');
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
                navigate('/404');
            }
        };

        const fetchRandomBlogs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'blogs'));
                const allBlogs = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                const shuffled = allBlogs.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 4);
                setRandomBlogs(selected);
            } catch (error) {
                console.error('Error fetching random blogs:', error);
            }
        };

        fetchBlog();
        fetchRandomBlogs();
    }, [id, navigate]);

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="flex flex-col md:flex-row pb-20 pt-5 md:py-32 relative">
            <div className="w-full md:w-2/3 p-4">
                <h1 className="text-2xl text-green-500 font-black">{blog.title}</h1>
                {blog.imagenUrl && <img src={blog.imagenUrl} alt={blog.title} className="mt-4 w-full rounded" />}
                <h2 className='text-slate-300 mt-4 mb-2'>Autor: <span className='text-purple-500'> Francisco Soto Flores</span></h2>
                <div className="text-white" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
            <aside className="w-full md:w-1/3 p-4">
                <h2 className="text-xl text-purple-500 font-bold mb-4">Visita otros blogs</h2>
                <ul>
                    {randomBlogs.map(randomBlog => (
                        <li key={randomBlog.id} className="mb-4">
                            <Link to={`/blogs/detalles/${randomBlog.id}`} className="block">
                                <h3 className="text-lg font-semibold text-white">{randomBlog.title}</h3>
                               <span className="text-sm text-gray-400">{new Date(randomBlog.createdAt).toLocaleDateString()}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
};

export default BlogDetails; */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [randomBlogs, setRandomBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const blogDoc = await getDoc(doc(db, 'blogs', id));
                if (blogDoc.exists()) {
                    const blogData = blogDoc.data();
                    if (blogData.createdAt && blogData.createdAt.toDate) {
                        blogData.createdAt = blogData.createdAt.toDate();
                    }
                    setBlog(blogData);
                } else {
                    navigate('/404');
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
                navigate('/404');
            }
        };

        const fetchRandomBlogs = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'blogs'));
                const allBlogs = querySnapshot.docs.map(doc => {
                    const blogData = doc.data();
                    if (blogData.createdAt && blogData.createdAt.toDate) {
                        blogData.createdAt = blogData.createdAt.toDate();
                    }
                    return {
                        id: doc.id,
                        ...blogData
                    };
                });
                const shuffled = allBlogs.sort(() => 0.5 - Math.random());
                const selected = shuffled.slice(0, 4);
                setRandomBlogs(selected);
            } catch (error) {
                console.error('Error fetching random blogs:', error);
            }
        };

        fetchBlog();
        fetchRandomBlogs();
    }, [id, navigate]);

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="flex flex-col md:flex-row pb-20 pt-5 md:py-32 relative">
            <div className="w-full md:w-2/3 p-4">
                <h1 className="text-2xl text-green-500 font-black">{blog.title}</h1>
                {blog.imagenUrl && <img src={blog.imagenUrl} alt={blog.title} className="mt-4 w-full rounded" />}
                <h2 className='text-slate-300 mt-4 mb-2'>Autor: <span className='text-purple-500'> Francisco Soto Flores</span></h2>
                <div className="text-white" dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
            <aside className="w-full md:w-1/3 p-4">
                <h2 className="text-xl text-purple-500 font-bold mb-4">Visita otros blogs</h2>
                <ul>
                    {randomBlogs.map(randomBlog => (
                        <li key={randomBlog.id} className="mb-4">
                            <Link to={`/blogs/detalles/${randomBlog.id}`} className="block">
                                <h3 className="text-lg font-semibold text-white">{randomBlog.title}</h3>
                                <span className="text-sm text-gray-400">
                                    {randomBlog.createdAt ? new Date(randomBlog.createdAt).toLocaleDateString() : 'Fecha no disponible'}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </div>
    );
};

export default BlogDetails;

