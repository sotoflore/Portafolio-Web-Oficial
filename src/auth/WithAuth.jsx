import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const WithAuth = (Component) => {

    return (props) => {

        const [user, loading] = useAuthState(auth);
        const navigate = useNavigate();

        useEffect(() => {
            if (!loading && !user) {
                navigate('/authentication/login/user');
            }
        }, [user, loading, navigate]);

        return user ? <Component {...props} /> : null;
    };
};
export default WithAuth;
