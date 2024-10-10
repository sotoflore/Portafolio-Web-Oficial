import Experience from '../../components/userProfile/Experience';
import Education from '../../components/userProfile/Education';
import useFirestoreCollection from '../../hooks/useFirestoreCollection';
import ProfileDetails from '../../components/userProfile/ProfileDetails';
import Skeleton from '../../components/skeleton/Skeleton';

const Profile = () => {

    const { data: perfil, loading, error } = useFirestoreCollection('perfil');

    if (loading) return <Skeleton />;
    if (error) return <div>Error al cargar el perfil: {error.message}</div>;

    return (
        <section className='pt-3 pb-24 md:ppb-0 px-3 md:px-5 xl:px-0 md:pt-28'>
            {perfil.map((item) => (
                <ProfileDetails key={item.id} item={item} />
            ))}
            <div className='flex flex-col md:flex-row  gap-8'>
                <Experience />
                <Education />
            </div>
        </section>
    );
};

export default Profile;
