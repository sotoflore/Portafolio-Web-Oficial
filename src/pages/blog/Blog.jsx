import { NavLink } from 'react-router-dom';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';

const Blog = () => {
    const { data: blogs } = useFirestoreCollection('blogs');
    
    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = timestamp.toDate();

        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        return new Intl.DateTimeFormat('es-ES', options).format(date);
    }
    
    return (
        <section className="pb-24 pt-5 md:py-32 relative">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">
                    <h1 className="text-green-600 text-3xl font-extrabold sm:text-4xl">Publicaciones de blogs</h1>
                    <p className="text-slate-400">
                        Bienvenido a la sección de blogs, donde compartiré conocimientos, recursos y
                        temas relacionados con el desarrollo web y más.
                    </p>
                </div>
                <ul className="grid gap-x-8 gap-y-10 mt-16 sm:grid-cols-2 lg:grid-cols-3">
                    {blogs.map(blog => (
                        <li className="w-full mx-auto group sm:max-w-sm" key={blog.id}>
                            <NavLink to={`/blogs/detalles/${blog.id}`} className='block cursor-pointer'>
                                <img src={blog.imagenUrl} loading="lazy" alt={blog.title} className="w-full  rounded-lg" />
                                <div className="mt-3 space-y-2">
                                    <span className="block text-purple-500 text-sm">{formatDate(blog.createdAt)}</span>
                                    <h3 className="text-lg text-slate-300 font-semibold">
                                        {blog.title}
                                    </h3>
                                </div>
                            </NavLink>
                        </li>
                    ))} 
                </ul>
            </div>
        </section>
    )
}
export default Blog;