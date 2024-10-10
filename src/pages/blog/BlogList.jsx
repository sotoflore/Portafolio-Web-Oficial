import { Link, useNavigate } from 'react-router-dom';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import { IoMdAdd } from 'react-icons/io';
import ButtonActions from '../../components/button/ButtonAcctions';
import ButtonAddLink from '../../components/button/ButtonAddLink';

const BlogList = () => {

    const { data: blogs, handleDelete } = useFirestoreCollection('blogs');
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/access/admin/edit-blog/${id}`);
    };

    return (
        <div className="my-8 bg-white shadow-md rounded-md py-4 px-10">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 my-3">Blogs</h2>
                <ButtonAddLink
                    to="/access/admin/add-blog"
                    buttonText="Crear nuevo blog"
                />
            </div>
            <div className="mt-4 space-y-6">

                {blogs.map(blog => (
                    <div key={blog.id} className="flex justify-between border p-4 mb-2 broder-gray-400 rounded shadow">
                        <h4 className="text-base font-medium">{blog.title}</h4>
                        <ButtonActions
                            onEdit={() => handleEdit(blog.id)}
                            onDelete={() => handleDelete(blog.id, blog.imagenUrl)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
