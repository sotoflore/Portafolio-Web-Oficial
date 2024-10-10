import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import WithAuth from './auth/WithAuth';
import Login from './pages/login/Login';
import AddExperience from './pages/admin/experience/AddExperience';
import AddEducation from './pages/admin/education/AddEducation';
import AddCertification from './pages/admin/certificacion/AddCertification';
import AddKnowledge from './pages/admin/Knowledge/AddKnowledge';
import AddProject from './pages/admin/project/AddProject';
import ProfileInfo from './pages/profile/ProfileInfo';
import Admin from './pages/admin/Admin';
import ExperienceList from './pages/admin/experience/ExperienceList';
import EducationList from './pages/admin/education/EducationList';
import ProfileAdmin from './pages/profile/ProfileAdmin';
import ProjectList from './pages/admin/project/ProjectList';
import KnowledgeList from './pages/admin/Knowledge/KnowledgeList';
import CertificationList from './pages/admin/certificacion/CertificationList';
import EditProfileInfo from './pages/profile/EditProfileInfo';
import EditExperience from './pages/admin/experience/EditExperience';
import EditEducation from './pages/admin/education/EditEducation';
import EditKnowledge from './pages/admin/knowledge/EditKnowledge';
import EditProject from './pages/admin/project/EditProject';
import EditCertification from './pages/admin/certificacion/EditCertification';
import Contact from './pages/Contact';
import Profile from './pages/profile/Profile';

import LayoutContent from './layout/LayoutContent';
import HomePage from './pages/HomePage';
import EmailsList from './pages/admin/emails/EmailsList';
import Blog from './pages/blog/Blog';
import BlogList from './pages/blog/BlogList';
import CreateBlog from './pages/blog/CreateBlog';
import EditBlog from './pages/blog/EditBlog';
import BlogDetails from './pages/blog/BlogDetails';
import NotFound from './pages/NotFound';

const AdminWithAuth = WithAuth(Admin);

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />}>
                        <Route index element={<LayoutContent/>} />
                        <Route path="/authentication/login/user" element={<Login />} />
                        <Route path="/perfil" element={<Profile />} />
                        <Route path="/contacto" element={<Contact />} />
                        <Route path="/blogs" element={<Blog />} />
                        <Route path="/blogs/detalles/:id" element={<BlogDetails />} />

                    </Route>
                    <Route path="*" element={<NotFound />} />

                    <Route path="/access/admin" element={<AdminWithAuth />}>

                        <Route path="perfil-admin" element={<ProfileAdmin />} />
                        <Route path="list-experience" element={<ExperienceList />} />
                        <Route path="list-education" element={<EducationList />} />
                        <Route path="list-knowledge" element={<KnowledgeList />} />
                        <Route path="list-certification" element={<CertificationList />} />
                        <Route path="list-projects" element={<ProjectList />} />
                        <Route path="list-emails" element={<EmailsList />} />
                        <Route path="list-blogs" element={<BlogList />} />

                        <Route path="add-perfil" element={<ProfileInfo />} />
                        <Route path="edit-perfil/:id" element={<EditProfileInfo />} />

                        <Route path="add-experience" element={<AddExperience />} />
                        <Route path="edit-experience/:id" element={<EditExperience />} />

                        <Route path="add-education" element={<AddEducation />} />
                        <Route path="edit-education/:id" element={<EditEducation />} />

                        <Route path="add-knowledge" element={<AddKnowledge />} />
                        <Route path="edit-knowledge/:id" element={<EditKnowledge />} />

                        <Route path="add-certification" element={<AddCertification />} />
                        <Route path="edit-certification/:id" element={<EditCertification />} />


                        <Route path="add-project" element={<AddProject />} />
                        <Route path="edit-project/:id" element={<EditProject />} />

                       <Route path="add-blog" element={<CreateBlog />} />
                       <Route path="edit-blog/:id" element={<EditBlog />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
