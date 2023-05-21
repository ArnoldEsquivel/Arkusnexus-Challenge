import { Suspense } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Sidebar from '../Layout/Sidebar'
import Backdrop from '../Layout/Backdrop'

const PrivateRoute = () => {
    const { isAuthenticated } = useAuthContext();

    if (!isAuthenticated) {
        return <Navigate to="/" />
    }

    return (
        <Sidebar>
            <Suspense fallback={<Backdrop />}>
                <Outlet />
            </Suspense>
        </Sidebar>
    );
};

export default PrivateRoute;