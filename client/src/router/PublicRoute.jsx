import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PublicRoute = () => {
    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to="/Private" />
    }

    return (
        <Outlet />
    );
};

export default PublicRoute;